const mongoose = require('mongoose');
const Task = require('../models/task'); 

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  if (!req.body.title || !req.body.reps || !req.body.load || !req.body.user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (isNaN(req.body.reps) || isNaN(req.body.load)) {
    return res.status(400).json({ error: 'Reps and load must be numbers' });
  }

  const task = new Task({
    title: req.body.title,
    reps: req.body.reps,
    load: req.body.load,
    user_id: req.body.user_id,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
    console.log("Data saved");
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid task ID' });
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid task ID' });
  }

  if (!req.body.title || !req.body.reps || !req.body.load || !req.body.user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (isNaN(req.body.reps) || isNaN(req.body.load)) {
    return res.status(400).json({ error: 'Reps and load must be numbers' });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        reps: req.body.reps,
        load: req.body.load,
        user_id: req.body.user_id,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'No such task' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
