import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './TaskList.css';
import { MdDeleteForever, MdEdit, MdClose } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { FaSyncAlt } from "react-icons/fa";
const TaskList = ({ handleLoading, darkTheme }) => {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = () => {
    handleLoading(true);
    fetch('http://localhost:4000/api/tasks')
      .then(response => response.json())
      .then(data => {
        const formattedTasks = data.map(task => ({
          ...task,
          formattedCreatedAt: new Date(task.createdAt).toLocaleString()
        }));
        setTasks(formattedTasks);
        handleLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        handleLoading(false);
      });
  };

  const deleteTask = (taskId) => {
    const originalTasks = [...tasks];
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

    fetch(`http://localhost:4000/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          setTasks(originalTasks);
          console.error('Error deleting task:', response.statusText);
        }
      })
      .catch(error => {
        setTasks(originalTasks);
        console.error('Error deleting task:', error);
      });
  };

  const editTask = (task) => {
    setEditedTask(task);
    setIsModalOpen(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (editedTask) {
      fetch(`http://localhost:4000/api/tasks/${editedTask._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      })
        .then(response => {
          if (response.ok) {
            setTasks(prevTasks => prevTasks.map(task => (task._id === editedTask._id ? editedTask : task)));
            setIsModalOpen(false);
          } else {
            console.error('Error updating task:', response.statusText);
          }
        })
        .catch(error => console.error('Error updating task:', error));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="tasklist-container">
        {tasks.map(task => (
          <div className={darkTheme ? 'task-card dark' : 'task-card light'} key={task._id}>
            <h2 className="task-title">{task.title}</h2>
            <div className="task-details">
              <p><strong>Reps:</strong> {task.reps}</p>
              <p><strong>Load:</strong> {task.load}</p>
              <p><strong>User ID:</strong> {task.user_id}</p>
              <p style={{ fontSize: "0.6rem" }}><strong>Created:</strong> {task.formattedCreatedAt}</p>
            </div>
            <div className={darkTheme ? 'button-container dark' : 'button-container light'}>
              <button className={darkTheme? 'delete-button dark' : ' delete-button light'} onClick={() => deleteTask(task._id)}>
                <MdDeleteForever className="delete-icon" />
              </button>
              <button className={darkTheme? ' edit-button dark' : 'edit-button light'} onClick={() => editTask(task)}>
                <MdEdit className="edit-icon" />
              </button>
            </div>
          </div>
        ))}
        {isModalOpen && editedTask && (
          <div className={darkTheme? ' modal dark' : 'modal light'}>
            <div className={darkTheme? 'modal-content dark' : 'modal-content light'}>

              <div className="modal-header">
                <h3 className="modal-title">Edit Task</h3>
                <button className={darkTheme? ' close-button dark' : 'close-button light'} onClick={() => setIsModalOpen(false)}>
                  <MdClose className="close-icon" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className={darkTheme? ' edit-form dark' : 'edit-form light'}>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reps">Reps:</label>
                  <input
                    type="number"
                    id="reps"
                    value={editedTask.reps}
                    onChange={(e) => setEditedTask({ ...editedTask, reps: parseInt(e.target.value, 10) })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="load">Load:</label>
                  <input
                    type="number"
                    id="load"
                    value={editedTask.load}
                    onChange={(e) => setEditedTask({ ...editedTask, load: parseInt(e.target.value, 10) })}
                  />
                </div>
                <button type="submit"><IoMdSave /> </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="refresh">
        <button className={darkTheme?"refresh-button dark" :"refresh-button light" } onClick={fetchTasks}>
          <FaSyncAlt />
        </button>
      </div>
    </>
  );
};

TaskList.propTypes = {
  handleLoading: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default TaskList;

