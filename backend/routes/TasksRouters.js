// Import required modules
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');

// Get all tasks
router.get('/', taskController.getAllTasks);

// Create a new task
router.post('/', taskController.createTask);

// Update a task by ID
router.patch('/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);

// Export the router
module.exports = router;