import { forwardRef } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = forwardRef((props,inputRef) => {

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = inputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type='text' ref={inputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
});

export default TaskForm;
