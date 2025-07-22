# 📝 Task Manager Web App

A responsive and user-friendly **Task Manager Web Application** built using HTML, CSS, JavaScript for the frontend and Node.js, Express.js, and MongoDB for the backend.

## 🚀 Features

- ✅ Add tasks with title, description, priority, due date, and time
- 📝 Edit and update existing tasks
- ❌ Delete tasks individually
- 🔍 Filter tasks based on priority
- 🎯 Mark tasks as completed
- 💾 Persistent storage using MongoDB

##🔗 Live Demo: [https://scw4.netlify.app](https://scw4.netlify.app)

## 🌐 Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive layout

### Backend
- Node.js + Express.js
- MongoDB for database
- RESTful API integration

## 📁 Project Structure

```
to-do-web-app/
├── client/           # Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── models/           # Mongoose model (Task)
│   └── Task.js
├── routes/           # API routes
│   └── tasks.js
├── server.js         # Backend entry point
├── package.json
└── README.md
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/trashika112/SCT_WD_4.git
cd SCT_WD_4
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Start the Backend Server
```bash
node server.js
```

### 4. Open the Frontend
Navigate to the `client/` folder and open `index.html` in your browser.

## License

This project is open source and available under the [MIT License](LICENSE).


## 👩‍💻Author
Trashika S Karkera
