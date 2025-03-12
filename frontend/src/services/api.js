import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  // Get all todos with optional filters
  async getTodos(searchQuery = '', completedFilter = null) {
    let url = '/todos/';
    const params = {};
    
    if (searchQuery) {
      params.search = searchQuery;
    }
    
    if (completedFilter !== null) {
      params.completed = completedFilter;
    }
    
    const response = await apiClient.get(url, { params });
    return response.data;
  },
  
  // Get a single todo by ID
  async getTodo(id) {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
  },
  
  // Create a new todo
  async createTodo(todoData) {
    const response = await apiClient.post('/todos/', todoData);
    return response.data;
  },
  
  // Update an existing todo
  async updateTodo(id, todoData) {
    const response = await apiClient.put(`/todos/${id}`, todoData);
    return response.data;
  },
  
  // Delete a todo
  async deleteTodo(id) {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  }
};

export default apiClient;