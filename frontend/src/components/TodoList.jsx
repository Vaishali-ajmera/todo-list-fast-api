import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { todoService } from '../services/api';

const TodoList = ({ searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filterValue, setFilterValue] = useState('all');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Fetch todos based on search and filter
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        let completedFilter = null;
        if (filterValue === 'completed') completedFilter = true;
        if (filterValue === 'active') completedFilter = false;
        
        const data = await todoService.getTodos(searchQuery, completedFilter);
        setTodos(data.todos);
        setError(null);
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [searchQuery, filterValue]);

  // Handle todo completion toggle
  const handleToggleComplete = async (id, completed) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { completed });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      showNotification(`Task ${completed ? 'completed' : 'reopened'}`, 'success');
    } catch (err) {
      console.error('Error updating todo:', err);
      showNotification('Failed to update task status', 'error');
    }
  };

  // Handle todo deletion
  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      showNotification('Task deleted', 'success');
    } catch (err) {
      console.error('Error deleting todo:', err);
      showNotification('Failed to delete task', 'error');
    }
  };

  // Handle edit button click
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormOpen(true);
  };

  // Handle form submission for editing
  const handleEditComplete = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
    setEditingTodo(null);
    showNotification('Task updated', 'success');
  };

  // Handle form submission for adding
  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
    showNotification('Task added', 'success');
  };

  // Show notification
  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          My Tasks
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={filterValue}
              label="Filter"
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingTodo(null);
              setFormOpen(true);
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : todos.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          {searchQuery || filterValue !== 'all' 
            ? 'No matching tasks found.' 
            : 'No tasks yet. Start by adding one!'}
        </Typography>
      ) : (
        todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}

      <TodoForm 
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onTodoAdded={handleTodoAdded}
        editingTodo={editingTodo}
        onEditComplete={handleEditComplete}
      />

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TodoList;