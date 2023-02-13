import './App.css';
import React, { useReducer, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, UserLogin, TweetsArray, IsLoading } from './lib/Context';
import tweetReducer from './lib/TweetReducer';
import NotFound from './pages/NotFound';
import { getTweetsArray } from './lib/Helper';


function App() {
  const [userLogin, setUserLogin] = useState('');
  const [tweetsArray, dispatch] = useReducer(tweetReducer, { tweetsArray: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUserLogin = localStorage.getItem('userLogin');
    if (storedUserLogin) {
      try {
        setUserLogin(storedUserLogin);
      } catch (e) {
        console.log(e);
      }
    }
    getTweetsArray(dispatch, setIsLoading);
  }, []);

  useEffect(() => {
    localStorage.setItem('userLogin', userLogin);
  }, [userLogin]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserLogin.Provider value={{ userLogin, setUserLogin }}>
        <TweetsArray.Provider value={{ tweetsArray, dispatch }}>
          <IsLoading.Provider value={{ isLoading, setIsLoading }}>
            <div className="App">
              <NavBar />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/home" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </div>
          </IsLoading.Provider>
        </TweetsArray.Provider> 
      </UserLogin.Provider>
    </ThemeProvider>
  );
}

export default App;
