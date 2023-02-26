import React, { useContext, useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { IsLoading, UserID } from '../lib/Context';
import { postTweet } from '../lib/Helper';


function NewTweetForm() {

  const [newTweetText, setNewTweetText] = useState('');
  const { isLoading, setIsLoading } = useContext(IsLoading);
  const { userID } = useContext(UserID);
  
  
  function submitTweet() {
    const tweetData = {
      content: newTweetText,
      userID: userID,
      date: new Date().toISOString(),
    }
    postTweet(tweetData, setIsLoading);
    setNewTweetText('');
  }
  
  return (
      <Box className='position-relative mt-3' display="inline-flex">
        <TextField
          id="outlined-textarea"
          placeholder="What you have in mind..."
          multiline
          rows='5'
          value={newTweetText}
          onChange={(e) => setNewTweetText(e.target.value)}
          sx={{ width: "600px" }}
        />  
        <Button 
        className='position-absolute' 
        disabled={newTweetText.length > 140 || newTweetText.length === 0 || isLoading ? true : false}  
        variant="contained" 
        onClick={() => submitTweet()} 
        sx={{ 
          bottom: "10px", 
          right: "10px", 
          background: "#007BFF"}}>
          Tweet
        </Button>
        {newTweetText.length > 140 ? <div 
        className='position-absolute' 
        style={{
          left: '10px', 
          bottom: '10px', 
          background: '#F5C6CB', 
          color: "#721C24", 
          borderColor: "#F5C6CB", 
          borderRadius: "5px", 
          lineHeight: "30px", 
          width: "58%"}}>
            The tweet can't contain more than 140 chars
          </div> : null}
      </Box>                     
  )
}

export default NewTweetForm