import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';
import { useRef } from 'react';

const NewTask = (props) => {
  const taskTextRef = useRef();

  const createTask = (taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskTextRef.current.value };

    props.onAddTask(createdTask);
  };

  const [isLoading, error, sendPostRequest] = useHttp(false,null,createTask);

  const enterTaskHandler = () => {
    sendPostRequest(
      {
        url: 'https://alpery-582ef-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskTextRef.current.value },
      }
    );
  };

  return (
    <Section>
      <TaskForm  ref={taskTextRef} onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
