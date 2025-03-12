from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import todos

app = FastAPI(title="Task Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router, prefix="/api/todos", tags=["todos"])

@app.get("/")
async def root():
    return {"message": "Task Management API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)