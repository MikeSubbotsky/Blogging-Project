import './App.css';
import React, { useReducer, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, UserLogin, TweetsArray, IsLoading, IsLoggedIn, UserID } from './lib/Context';
import tweetReducer from './lib/TweetReducer';
import NotFound from './pages/NotFound';
import { getTweetsArray } from './lib/Helper';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [userLogin, setUserLogin] = useState('');
  const [tweetsArray, dispatch] = useReducer(tweetReducer, { tweetsArray: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
 

  useEffect(() => {
    if (isLoggedIn) {
      try {
        getTweetsArray(dispatch, setIsLoading);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isLoggedIn]);

  

  useEffect(() => {
    localStorage.setItem('userLogin', userLogin);
  }, [userLogin]);

  return (
    <ThemeProvider theme={darkTheme}>
        <IsLoggedIn.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <UserID.Provider value={{ userID, setUserID }}>
          <CssBaseline />
          <UserLogin.Provider value={{ userLogin, setUserLogin }}>
            <TweetsArray.Provider value={{ tweetsArray, dispatch }}>
              <IsLoading.Provider value={{ isLoading, setIsLoading }}>
                <div className="App">
                  <NavBar />
                  <Routes>
                  <Route path="/" element={<ProtectedRoute children={<MainPage />} />} />
                  <Route path="/home/*" element={<ProtectedRoute children={<MainPage />} />} />
                  <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} />} />
                  <Route path="/*" element={<NotFound />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  </Routes>
                </div>
              </IsLoading.Provider>
            </TweetsArray.Provider> 
          </UserLogin.Provider>
          </UserID.Provider>
        </IsLoggedIn.Provider>
    </ThemeProvider>
  );
}

export default App;
