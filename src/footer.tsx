/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import { TODOS } from './constants';
import { pluralize } from './utils';
import styles from './Footer.module.css';

interface ITodoFooterProps {
  completedCount: number;
  onClearCompleted: any;
  nowShowing: string;
  count: number;
  // eslint-disable-next-line react/require-default-props
  setNowShowing?: any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TodoFooter = ({
  completedCount,
  onClearCompleted,
  setNowShowing,
  nowShowing,
  count
}: ITodoFooterProps) => {
  const activeTodoWord = pluralize(count, 'item');
  let clearButton = null;

  if (completedCount > 0) {
    clearButton = (
      <button className={styles.clearCompleted} onClick={onClearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer className={styles.footer}>
      <span className={styles.todoCount}>
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className={styles.filters}>
        <li>
          <span
            onClick={() => setNowShowing(TODOS.ALL)}
            className={nowShowing === TODOS.ALL ? styles.selected : ''}
          >
            All
          </span>
        </li>{' '}
        <li>
          <span
            onClick={() => setNowShowing(TODOS.ACTIVE)}
            className={nowShowing === TODOS.ACTIVE ? styles.selected : ''}
          >
            Active
          </span>
        </li>{' '}
        <li>
          <span
            onClick={() => setNowShowing(TODOS.COMPLETED)}
            className={nowShowing === TODOS.COMPLETED ? styles.selected : ''}
          >
            Completed
          </span>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
};

export default TodoFooter;
