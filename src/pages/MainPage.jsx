import React, { useContext, useEffect } from 'react'
import DisplayTweets from '../components/DisplayTweets'
import NewTweetForm from '../components/NewTweetForm'
import { TweetsArray } from '../lib/Context';
import { getTweetsArray } from '../lib/Helper';

function MainPage() {

  const { dispatch } = useContext(TweetsArray)

  useEffect(() => {
    const tweetUpdateInterval = setInterval(() => {
      getTweetsArray(dispatch);
      //console.log('updated');
    }, 5000);
    return () => clearInterval(tweetUpdateInterval);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
        <NewTweetForm />
        <DisplayTweets />
    </div>
  )
}

export default MainPage