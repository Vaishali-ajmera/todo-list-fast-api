import React, { useState } from 'react';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material';
import { ThemeContext } from './contexts/ThemeContext';
import Header from './components/Header';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = React.useContext(ThemeContext);

  // Create theme based on dark mode context
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#f50057',
          },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoList searchQuery={searchQuery} />
      </Box>
    </ThemeProvider>
  );
}

export default App;