from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

# Request Models
class TodoCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    completed: bool = Field(default=False)

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    completed: Optional[bool] = None

# Response Models
class TodoResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    completed: bool
    created_at: datetime
    updated_at: datetime

class TodoListResponse(BaseModel):
    todos: List[TodoResponse]
    count: int