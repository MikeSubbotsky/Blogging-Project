import { collection, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';
import DisplayTweets from '../components/DisplayTweets'
import NewTweetForm from '../components/NewTweetForm'
import { IsLoading, TweetsArray, UserLogin } from '../lib/Context';
import { db } from '../lib/firebase';
import { getTweetsArray } from '../lib/Helper';



function MainPage() {

  const { userLogin } = useContext(UserLogin);
  const { tweetsArray, dispatch } = useContext(TweetsArray);
  const { setIsLoading } = useContext(IsLoading);
  const numberOfTweets = useRef(10);

useEffect(() => { 
  const unsubscribe = onSnapshot(collection(db, "tweets"), () => {
    getTweetsArray(dispatch, setIsLoading, numberOfTweets.current);
  });
  return () => {
    unsubscribe();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;


  if (tweetsArray.tweetsArray.length + 10 >= numberOfTweets.current && windowHeight + scrollTop === documentHeight) {
    numberOfTweets.current += 10;
    getTweetsArray(dispatch, setIsLoading, numberOfTweets.current);
  }
};

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [tweetsArray]);


  return (
    userLogin ? (
      <div>
        <NewTweetForm />
        <DisplayTweets />
    </div>
    ) : 
    <div>
      {alert('Please enter Username')}
      <Navigate to="/profile" replace />
    </div>
  )
}

export default MainPage;

