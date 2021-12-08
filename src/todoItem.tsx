/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { KEYS } from './constants';
import styles from './App.module.css';

// eslint-disable-next-line react/no-unused-prop-types
const TodoItem = (props: {
  todo: ITodo;
  onToggle: any;
  editing: boolean;
  onDestroy: any;
  onEdit: any;
  onSave: any;
  onCancel: any;
}) => {
  const [editTitle, setEditTitle] = useState(props.todo.title);

  const handleEdit = () => {
    props.onEdit(props.todo);
    setEditTitle(props.todo.title);
  };

  const handleSubmit = () => {
    const val = editTitle.trim();
    if (val) {
      props.onSave(props.todo, val);
      setEditTitle(val);
    } else {
      props.onDestroy();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === KEYS.ESCAPE_KEY) {
      setEditTitle(props.todo.title);
      props.onCancel();
    } else if (event.key === KEYS.ENTER_KEY) {
      handleSubmit();
    }
  };

  const handleChange = (event: React.FormEvent) => {
    const input: any = event.target;
    setEditTitle(input.value);
  };

  return (
    <li
      // eslint-disable-next-line no-nested-ternary
      className={props.todo.completed ? styles.completed : props.editing ? styles.editing : ''}
    >
      <div className={styles.view}>
        <input
          className={styles.toggle}
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => props.onToggle(props.todo)}
        />
        <label onDoubleClick={() => handleEdit()}>{props.todo.title}</label>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className={styles.destroy} onClick={() => props.onDestroy(props.todo)} />
      </div>
      <input
        className={styles.edit}
        value={editTitle}
        onBlur={() => handleSubmit()}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </li>
  );
};

export default TodoItem;
