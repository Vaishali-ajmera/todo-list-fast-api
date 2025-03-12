from fastapi import APIRouter, HTTPException, Query, status
from typing import Optional

from app.models import todo_db
from app.schemas import TodoCreate, TodoUpdate, TodoResponse, TodoListResponse

router = APIRouter()

@router.post("/", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoCreate):
    """Create a new todo item"""
    return todo_db.add_todo(todo)

@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(todo_id: str):
    """Get a specific todo by ID"""
    todo = todo_db.get_todo(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.get("/", response_model=TodoListResponse)
async def get_todos(
    search: Optional[str] = None, 
    completed: Optional[bool] = None
):
    """
    Get all todos, with optional filtering.
    
    - If search is provided, return todos that match the search term
    - If completed is provided, filter by completion status
    """
    if search:
        todos = todo_db.search_todos(search)
    elif completed is not None:
        todos = todo_db.filter_todos(completed)
    else:
        todos = todo_db.get_all_todos()
        
    return {"todos": todos, "count": len(todos)}

@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(todo_id: str, todo: TodoUpdate):
    """Update a todo item"""
    updated_todo = todo_db.update_todo(todo_id, todo)
    if not updated_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated_todo

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: str):
    """Delete a todo item"""
    deleted = todo_db.delete_todo(todo_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Todo not found")
    return None