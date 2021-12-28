import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReguessionGame from './components/ReguessionGame';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const preTheme = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#2895f1',
      paper: '#ffffff',
    },
  },
};

const theme = createTheme(preTheme)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ReguessionGame />
    </ThemeProvider>
  );
}

export default App;
