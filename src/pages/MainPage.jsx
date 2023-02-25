import React from 'react'
import DisplayTweets from '../components/DisplayTweets'
import NewTweetForm from '../components/NewTweetForm'


function MainPage() {


  return (
    <div>
        <NewTweetForm />
        <DisplayTweets />
    </div>
  )
}

export default MainPage;

