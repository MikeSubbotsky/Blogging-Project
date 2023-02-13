import React, { useContext } from 'react';
import { TweetsArray } from '../lib/Context';
import Tweet from './Tweet';

function DisplayTweets() {
  const { tweetsArray } = useContext(TweetsArray);

  return (
    <div>
      {Array.isArray(tweetsArray.tweetsArray) && [...tweetsArray.tweetsArray].reverse().map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </div>
  )
}

export default DisplayTweets;