import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import './TaskPage.css'

const TaskPage = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true); // State for managing theme

  useEffect(() => {
    // Load the appropriate CSS file based on the darkTheme state
    const themeCssLink = document.getElementById('theme-css');
    if (themeCssLink) {
      if (darkTheme) {
        themeCssLink.href = 'path-to-your-dark-theme.css'; // Replace 'path-to-your-dark-theme.css' with the actual path to your dark theme CSS file
      } else {
        themeCssLink.href = 'path-to-your-light-theme.css'; // Replace 'path-to-your-light-theme.css' with the actual path to your light theme CSS file
      }
    }
  }, [darkTheme]);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      setProgress(30); // Start the loading bar
    } else {
      setProgress(100); // Complete the loading bar
    }
  };

  useEffect(() => {
    if (!loading && progress === 100) {
      const timeout = setTimeout(() => setProgress(0), 500); // Reset the loading bar
      return () => clearTimeout(timeout);
    }
  }, [loading, progress]);

  // Function to toggle theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={darkTheme ? 'task-page-container dark' : 'task-page-container light'}>
      <LoadingBar
        progress={progress}
        height={3}
        color="#f09"
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="task-page-title">Task Manager</h1>
      <div className="task-content">
        {/* Pass theme and toggle function as props */}
        <AddTask handleLoading={handleLoading} darkTheme={darkTheme} />
        <TaskList handleLoading={handleLoading} darkTheme={darkTheme} />
      </div>
      {/* Button to toggle theme */}
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {darkTheme ? '🌞' : '🌙'} {/* Sun and moon icons for light and dark mode */}
      </button>
      {/* Dynamic loading of CSS files */}
      <link id="theme-css" rel="stylesheet" href="path-to-your-dark-theme.css" /> {/* Replace 'path-to-your-dark-theme.css' with the actual path to your dark theme CSS file */}
    </div>
  );
};

export default TaskPage;
