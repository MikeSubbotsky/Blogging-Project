import { CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { IsLoading, IsLoggedIn, TweetsArray } from '../lib/Context';
import Tweet from './Tweet';

function DisplayTweets() {
  const { tweetsArray } = useContext(TweetsArray);
  const { isLoading } = useContext(IsLoading);
  const { isLoggedIn } = useContext(IsLoggedIn);

  return (
    <div>
      {isLoading && <CircularProgress color="inherit" />}
      {Array.isArray(tweetsArray.tweetsArray) && tweetsArray.tweetsArray.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  )
}

export default DisplayTweets;


