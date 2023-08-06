import React, { useState, useEffect } from 'react';
import './Homepage.css';

export default function Homepage({ name, id }) {
  // Use the id prop to create a unique database key for this Homepage
  const databaseKey = `homepage_${id}`;

  const [tasks, setTasks] = useState(() => {
    const localTasks = JSON.parse(localStorage.getItem(databaseKey) || '[]');
    return localTasks;
  });
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState(['Low', 'Medium', 'High']);
  const [selectedPriority, setSelectedPriority] = useState('');

  // Load tasks from local storage on initial render

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem(databaseKey, JSON.stringify(tasks));
  }, [databaseKey, tasks]);

  useEffect(() => {
    const completedTask = tasks.filter((task) => task.completed === true);

    if (completedTask.length > 3) {
      // Sort completed tasks by the latest ones first and keep the first 3
      const latestCompletedTasks = completedTask.sort((a, b) => b.id - a.id).slice(0, 3);
      const updatedTasks = tasks.filter((task) => !task.completed || latestCompletedTasks.includes(task));
      setTasks(updatedTasks);
    }
  }, [tasks]);

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      const taskId = Date.now().toString();
      const taskData = { id: taskId, text: newTask, completed: false, priority: selectedPriority ? selectedPriority : 'Low' };
      setTasks((prevTasks) => [...prevTasks, taskData]);
      setNewTask('');
    }
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleToggleCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);

    const editText = prompt('Please edit the task', updatedTasks[taskIndex].text);

    if (editText !== null) {
      // Save the edited task text
      updatedTasks[taskIndex].text = editText;

      // Display a select element with the current priority pre-selected
      const selectedPriority = prompt(
        'Please select the priority:',
        updatedTasks[taskIndex].priority
      );

      if (selectedPriority !== null) {
        // Check if the selected priority is valid (in the priority array)
        if (priority.includes(selectedPriority)) {
          // Save the edited priority
          updatedTasks[taskIndex].priority = selectedPriority;

          // Update the tasks state with the updatedTasks array
          setTasks(updatedTasks);
        } else {
          alert('Invalid priority! Please select a valid priority from the dropdown.');
        }
      }
    }
  };


  const sortTasksPriority =(tasks) => {
    return tasks.sort((a, b) =>{
      const priorityOrder = ['High', 'Medium', 'Low'];
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    })
  }

  console.log(sortTasksPriority(tasks));
  return (

     
    <div className="app">
      <h1 className='homepageNameTop'>{name}</h1>
      <div className='addToList'>
        <input
          type="text"
          placeholder="Add a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className='selectPriority'
        >
          {priority.map((prior) => (
            <option key={prior} value={prior}>
              {prior}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="displayTask">
        {tasks.some((task) => !task.completed) ? <h2 >Tasks</h2> : <p className='homepageName'>No Tasks yet</p>}

        {sortTasksPriority(tasks).map((task) =>
          task.completed ? (
            <div key={task.id}>
            </div>
          ) : (
            <div key={task.id} className="task-item">
              <input
                className='checkboxes'
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id)}
              />
              <p onClick={() => handleEditTask(task.id)} className="displayText">
                {task.priority === 'High' ? (
                  <span className='highPriority'>{task.text}</span>
                ) : task.priority === 'Medium' ? (
                  <span className='mediumPriority'>{task.text}</span>
                ) : (
                  <span className='lowPriority'>{task.text}</span>
                )
                }

              </p>

              <button onClick={() => handleDelete(task.id)} className='deleteButton'>
                Delete
              </button>
            </div>
          )
        )}
      </div>

      <hr />

      <div className='displayTask'>
        {tasks.some((task) => task.completed) ? <h2 className='homepageName'>Completed Task</h2> : <p className='homepageName'>No Completed Tasks yet</p>}
        {tasks.slice().reverse().map((task) =>
          task.completed ? (
            <div key={task.id} className="task-item">
              <input
                className='checkboxes'
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id)}
              />
              <p onClick={() => handleEditTask(task.id)} className="displayTextCompleted">
                {task.text}
              </p>
              <button onClick={() => handleDelete(task.id)} className='deleteButton'>
                Delete
              </button>
            </div>
          ) : (
            <div key={task.id}></div>
          )
        )}
      </div>
    </div>

  );
}
