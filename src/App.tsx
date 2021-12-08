/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../interfaces.d.ts"/>
import React, { useState, useEffect } from 'react';
import { TODOS, KEYS } from './constants';
import {
  concateTodo,
  toggleList,
  storeData,
  toggleElement,
  deleteElement,
  saveTitle,
  clearCompleted
} from './utils';
import styles from './App.module.css';
import TodoItem from './todoItem';
import TodoFooter from './footer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => {
  const [currentTodo, setCurrentTodo] = useState('');
  const [todoList, setTodoList] = useState<Array<ITodo> | []>([]);
  const [nowShowing, setNowShowing] = useState(TODOS.ALL);
  const [editting, setEditting] = useState('');

  useEffect(() => {
    setTodoList(storeData('todo-list'));
    return () => {
      storeData('todo-list', todoList);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewTodoKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== KEYS.ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = currentTodo.trim();

    if (val) {
      const updateList = concateTodo(val, todoList);
      if (updateList) {
        setTodoList(updateList);
      }
      setCurrentTodo('');
    }
  };

  const toggleAll = (event: React.FormEvent) => {
    const { target }: any = event;
    const { checked } = target;
    const list = toggleList(checked, todoList);
    setTodoList(list);
  };

  const toggle = (todoToToggle: ITodo) => {
    const list = toggleElement(todoToToggle, todoList);
    setTodoList(list);
  };

  const destroy = (todo: ITodo) => {
    const list = deleteElement(todo, todoList);
    setTodoList(list);
  };

  const edit = (todo: ITodo) => {
    setEditting(todo.id);
  };

  const save = (todoToSave: ITodo, text: string) => {
    const list = saveTitle(todoToSave, text, todoList);
    setTodoList(list);
    setEditting('');
  };

  const cancel = () => {
    setEditting('');
  };

  const clearCompletedBtn = () => {
    const list = clearCompleted(todoList);
    setTodoList(list);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shownTodos = todoList?.filter((todo: any) => {
    switch (nowShowing) {
      case TODOS.ACTIVE:
        return !todo?.completed;
      case TODOS.COMPLETED:
        return todo?.completed;
      case TODOS.ALL:
        return todo;
      default:
        return true;
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const todoItems = shownTodos?.map((todo: any) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggle}
        onDestroy={destroy}
        onEdit={edit}
        editing={editting === todo.id}
        onSave={save}
        onCancel={cancel}
      />
    );
  });

  const activeTodoCount = todoList.filter((todo: ITodo) => !todo?.completed);

  const completedCount = todoList?.length - activeTodoCount.length;

  return (
    <div>
      <header className={styles.header}>
        <h1>todos</h1>
        <input
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
          className={styles.todoInput}
          placeholder="What needs to be done?"
          onKeyDown={(e) => handleNewTodoKeyDown(e)}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </header>
      {todoList?.length > 0 && (
        <section className="main">
          <input
            id="toggle-all"
            className={styles.toggleAll}
            type="checkbox"
            onChange={(e) => toggleAll(e)}
            checked={activeTodoCount.length === 0}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className={styles.todoList}>{todoItems}</ul>
        </section>
      )}
      {(activeTodoCount.length !== 0 || completedCount !== 0) && (
        <TodoFooter
          count={activeTodoCount.length}
          completedCount={completedCount}
          setNowShowing={setNowShowing}
          nowShowing={nowShowing}
          onClearCompleted={clearCompletedBtn}
        />
      )}
    </div>
  );
};

export default App;
