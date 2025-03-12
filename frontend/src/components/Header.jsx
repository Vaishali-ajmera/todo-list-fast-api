import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Switch, Box, FormControlLabel } from '@mui/material';
import { ThemeContext } from '../contexts/ThemeContext';
import SearchBar from './SearchBar';

const Header = ({ searchQuery, setSearchQuery }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <AppBar position="static" color={darkMode ? "default" : "primary"}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Box sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Switch 
                checked={darkMode} 
                onChange={toggleTheme} 
                color="primary" 
              />
            }
            label={darkMode ? "Dark" : "Light"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;