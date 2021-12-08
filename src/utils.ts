/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-bitwise */

export const getList = localStorage.getItem('todo-list');

export function uuid(): string {
  // eslint-disable-next-line no-bitwise
  let i;
  let random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
}

export function pluralize(count: number, word: string): string {
  return count === 1 ? word : `${word}s`;
}

export function storeData(key: string, data?: any) {
  if (key && data) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  }

  const store = localStorage.getItem(key);
  return (store && JSON.parse(store)) || [];
}

export function concateTodo(title: string, todoList: Array<ITodo>) {
  let list: Array<ITodo> = [...todoList];
  if (list) {
    list = list.concat({
      id: uuid(),
      title,
      completed: false
    });
  } else {
    list = [
      {
        id: uuid(),
        title,
        completed: false
      }
    ];
  }
  storeData('todo-list', list);
  return list;
}

export function toggleList(checked: boolean, todoList: Array<ITodo>) {
  let list = [...todoList];
  list = list.map((todo: any) => {
    return { ...todo, completed: checked };
  });
  storeData('todo-list', getList);
  return list;
}

export function toggleElement(element: ITodo, todoList: Array<ITodo>) {
  const list = [...todoList];
  const getList = list.map((todo: ITodo) => {
    if (element.id === todo.id) {
      return { ...todo, completed: !todo.completed };
    }
    return { ...todo };
  });
  storeData('todo-list', getList);
  return getList;
}

export function deleteElement(element: ITodo, todoList: Array<ITodo>) {
  const list = [...todoList];
  const getList = list.filter((todo: ITodo) => todo.id !== element.id);
  storeData('todo-list', getList);
  return getList;
}

export function saveTitle(todoToSave: ITodo, text: string, todoList: Array<ITodo>) {
  const list = [...todoList];
  const getList = list.map((todo: ITodo) => {
    if (todoToSave.id === todo.id) {
      return { ...todo, title: text };
    }
    return { ...todo };
  });
  storeData('todo-list', getList);
  return getList;
}

export function clearCompleted(todoList: Array<ITodo>) {
  const list = [...todoList];
  const getList = list.filter((todo: ITodo) => !todo.completed);
  storeData('todo-list', getList);
  return getList;
}
