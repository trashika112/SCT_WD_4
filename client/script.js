const apiUrl = ' https://sct-wd-4-3.onrender.com';

let editingTaskId = null;

// Get form inputs
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const priorityInput = document.getElementById('priority');
const dueDateInput = document.getElementById('dueDate');
const dueTimeInput = document.getElementById('dueTime');
const submitBtn = document.getElementById('submitBtn');
const taskList = document.getElementById('taskList');

// Load all tasks on page load
window.addEventListener('DOMContentLoaded', fetchTasks);

// Submit button handler
submitBtn.addEventListener('click', async () => {
  const task = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    dueTime: dueTimeInput.value,
  };

  if (!task.title || !task.description || !task.priority || !task.dueDate || !task.dueTime) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    let response;

    if (editingTaskId) {
      response = await fetch(`${apiUrl}/${editingTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Unknown error');
    }

    alert(editingTaskId ? 'Task updated successfully ✅' : 'Task saved successfully ✅');
    clearForm();
    fetchTasks();
  } catch (err) {
    alert('❌ Failed to save task: ' + err.message);
  }
});

// Fetch tasks from backend
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
  } catch (err) {
    alert('❌ Failed to load tasks: ' + err.message);
  }
}

// Convert time to 12-hour format with AM/PM
function formatTimeTo12Hour(timeStr) {
  const [hour, minute] = timeStr.split(':');
  let hours = parseInt(hour, 10);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minute} ${suffix}`;
}

// Convert date to "21 July 2025" format
function formatDateReadable(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-GB', options);
}

// Render a single task box
function renderTask(task) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task-box');

  const formattedTime = formatTimeTo12Hour(task.dueTime);
  const formattedDate = formatDateReadable(task.dueDate);

  taskDiv.innerHTML = `
    <h3>${task.title}</h3>
    <p><strong>Description:</strong> ${task.description}</p>
    <p><strong>Priority:</strong> ${task.priority}</p>
    <p><strong>Due Date:</strong> ${formattedDate}</p>
    <p><strong>Due Time:</strong> ${formattedTime}</p>
    <div class="task-actions">
      <button onclick="editTask('${task._id}')">✏️ Edit</button>
      <button onclick="deleteTask('${task._id}')">🗑️ Delete</button>
    </div>
  `;

  taskList.appendChild(taskDiv);
}

// Edit task handler
async function editTask(id) {
  try {
    const response = await fetch(`${apiUrl}`);
    const tasks = await response.json();
    const task = tasks.find(t => t._id === id);

    if (!task) {
      alert('Task not found!');
      return;
    }

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;
    dueTimeInput.value = task.dueTime;

    editingTaskId = id;
    submitBtn.textContent = 'Update Task';
  } catch (err) {
    alert('❌ Failed to load task for editing: ' + err.message);
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Unknown error');
    }

    alert('🗑️ Task deleted successfully');
    fetchTasks();
  } catch (err) {
    alert('❌ Failed to delete task: ' + err.message);
  }
}

// Clear form after save or cancel
function clearForm() {
  titleInput.value = '';
  descriptionInput.value = '';
  priorityInput.value = '';
  dueDateInput.value = '';
  dueTimeInput.value = '';
  editingTaskId = null;
  submitBtn.textContent = 'Add Task';
}
