const express = require('express');
const router = express.Router();
const Task = require('../../models/task');

// ➕ Create a new Task
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate, dueTime } = req.body;

    if (!title || !description || !priority || !dueDate || !dueTime) {
      return res.status(400).json({
        error: 'All fields (title, description, priority, dueDate, dueTime) are required',
      });
    }

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      dueTime,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, dueDate, dueTime } = req.body;

    if (!title || !description || !priority || !dueDate || !dueTime) {
      return res.status(400).json({
        error: 'All fields (title, description, priority, dueDate, dueTime) are required',
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate, dueTime },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🗑️ Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
