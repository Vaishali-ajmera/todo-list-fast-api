from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

# In-memory database for simplicity
# In a real application, you would use a proper database like PostgreSQL
class TodoDB:
    def __init__(self):
        self.todos = {}
        self.counter = 0
    
    def add_todo(self, todo_data):
        self.counter += 1
        todo_id = str(self.counter)
        self.todos[todo_id] = {
            "id": todo_id,
            "title": todo_data.title,
            "description": todo_data.description,
            "completed": todo_data.completed,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        }
        return self.todos[todo_id]
    
    def get_todo(self, todo_id):
        return self.todos.get(todo_id)
    
    def get_all_todos(self):
        return list(self.todos.values())
    
    def update_todo(self, todo_id, todo_data):
        if todo_id not in self.todos:
            return None
        
        # Update only provided fields
        todo = self.todos[todo_id]
        
        if todo_data.title is not None:
            todo["title"] = todo_data.title
        
        if todo_data.description is not None:
            todo["description"] = todo_data.description
            
        if todo_data.completed is not None:
            todo["completed"] = todo_data.completed
            
        todo["updated_at"] = datetime.now()
        
        return todo
    
    def delete_todo(self, todo_id):
        if todo_id not in self.todos:
            return False
        del self.todos[todo_id]
        return True
    
    def search_todos(self, search_term):
        if not search_term:
            return self.get_all_todos()
            
        search_term = search_term.lower()
        return [
            todo for todo in self.todos.values()
            if search_term in todo["title"].lower() or 
               (todo["description"] and search_term in todo["description"].lower())
        ]
    
    def filter_todos(self, completed=None):
        if completed is None:
            return self.get_all_todos()
            
        return [
            todo for todo in self.todos.values()
            if todo["completed"] == completed
        ]

# Initialize the in-memory database
todo_db = TodoDB()