import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Checkbox, 
  IconButton, 
  Box,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  return (
    <Paper elevation={2} sx={{ mb: 2, borderRadius: 2 }}>
      <Card variant="outlined" sx={{ opacity: todo.completed ? 0.7 : 1 }}>
        <CardContent sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:last-child': { pb: 2 }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id, !todo.completed)}
              color="primary"
            />
            <Box sx={{ ml: 1 }}>
              <Typography 
                variant="h6" 
                component="div"
                sx={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary'
                }}
              >
                {todo.title}
              </Typography>
              {todo.description && (
                <Typography variant="body2" color="text.secondary">
                  {todo.description}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <IconButton 
              aria-label="edit"
              onClick={() => onEdit(todo)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              aria-label="delete"
              onClick={() => onDelete(todo.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
};


export default TodoItem;