import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { todoService } from '../services/api';

const TodoForm = ({ onTodoAdded, editingTodo, onEditComplete, open, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  
  // Reset form and load data when editing todo changes
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || '');
    } else {
      resetForm();
    }
  }, [editingTodo]);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      if (editingTodo) {
        const updatedTodo = await todoService.updateTodo(editingTodo.id, {
          title,
          description
        });
        onEditComplete(updatedTodo);
      } else {
        const newTodo = await todoService.createTodo({
          title,
          description,
          completed: false
        });
        onTodoAdded(newTodo);
      }
      resetForm();
      onClose();
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error saving todo:', err);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingTodo ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!error}
            helperText={error}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {editingTodo ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TodoForm;