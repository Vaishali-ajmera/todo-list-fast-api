# Todo List Application

A modern, responsive task management application built with React and FastAPI.

## 🚀 Features

- Create, edit, and delete tasks
- Mark tasks as completed or active
- Search functionality to find specific tasks
- Filter tasks by completion status (All/Active/Completed)
- Dark/Light mode toggle
- Responsive design for all screen sizes

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **Material UI** - Component library with ready-to-use components
- **Axios** - HTTP client for API requests
- **Vite** - Fast development environment and build tool

### Backend
- **FastAPI** - High-performance Python web framework
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server implementation

## 📋 Project Structure

```
todo-list-app/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py        # Main application entry
│   │   ├── models.py      # Data models
│   │   ├── schemas.py     # Pydantic schemas
│   │   └── routers/       # API routes
│   │       └── todos.py
│   ├── requirements.txt
│   └── Procfile           # For deployment
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # React components
    │   │   ├── TodoList.jsx
    │   │   ├── TodoItem.jsx
    │   │   ├── TodoForm.jsx
    │   │   └── ...
    │   ├── services/      # API services
    │   │   └── api.js
    │   ├── App.jsx        # Main React component
    │   └── main.jsx       # React entry point
    ├── package.json
    └── vercel.json        # For deployment
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or later)
- Python (v3.7 or later)
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Create and activate virtual environment
   python -m venv fastapi-env
   source fastapi-env/bin/activate  # On Windows: fastapi-env\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Run server
   uvicorn app.main:app --reload
   ```
   The backend server will run at http://localhost:8000

3. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Run development server
   npm run dev
   ```
   The frontend development server will run at http://localhost:5173

## 📡 API Endpoints

- `GET /api/todos/` - Get all todos (with optional search and filter)
- `GET /api/todos/{id}` - Get a specific todo
- `POST /api/todos/` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Backend (Render)
1. Connect your GitHub repository to Render
2. Configure as a Web Service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Select Python environment



