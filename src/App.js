import './App.css';
import React, { useReducer, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, UserLogin, TweetsArray } from './lib/Context';
import tweetReducer from './lib/TweetReducer';
import NotFound from './pages/NotFound';


function App() {
  const [userLogin, setUserLogin] = useState('');
  const [tweetsArray, dispatch] = useReducer(tweetReducer, { tweetsArray: [] });

  useEffect(() => {
    const storedUserLogin = localStorage.getItem('userLogin');
    if (storedUserLogin) {
      try {
        setUserLogin(storedUserLogin);
      } catch (e) {
        console.log(e);
      }
    }

    const storedTweetsArray = localStorage.getItem('tweetsArray');
    if (storedTweetsArray) {
      try {
        dispatch({ type: 'SET_TWEETS', payload: JSON.parse(storedTweetsArray) });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userLogin', userLogin);
  }, [userLogin]);

  useEffect(() => {
    localStorage.setItem('tweetsArray', JSON.stringify(tweetsArray.tweetsArray));
  }, [tweetsArray]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserLogin.Provider value={{ userLogin, setUserLogin }}>
        <TweetsArray.Provider value={{ tweetsArray, dispatch }}>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </TweetsArray.Provider> 
      </UserLogin.Provider>
    </ThemeProvider>
  );
}

export default App;
