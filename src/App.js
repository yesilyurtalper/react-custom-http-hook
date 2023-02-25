import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const [isLoading, error, sendGetRequest] = useHttp(false,null,transformTasks);


  useEffect(() => {
    sendGetRequest(
      { url: 'https://alpery-582ef-default-rtdb.firebaseio.com/tasks.json' }
    );
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendGetRequest.bind(null,{ url: 'https://alpery-582ef-default-rtdb.firebaseio.com/tasks.json' })}
      />
    </React.Fragment>
  );
}

export default App;
