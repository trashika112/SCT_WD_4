const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: [true, 'Priority is required'],
  },
  dueDate: {
    type: String,
    required: [true, 'Due date is required'],
  },
  dueTime: {
    type: String,
    required: [true, 'Due time is required'],
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
