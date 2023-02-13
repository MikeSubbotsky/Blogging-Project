import { createTheme } from '@mui/material/styles';
import React from 'react';

export const UserLogin = React.createContext({});
export const TweetsArray = React.createContext({});


export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      type: 'light',
      primary: {
        main: '#404040',
      },
      background: {
        default: '#202020',
        paper: '#303030',
      },
    },
  });