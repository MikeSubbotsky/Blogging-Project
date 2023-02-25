import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';

function Tweet({ tweet }) {
  return (
    <Card className='my-3 d-flex flex-column mx-auto' sx={{ width: "600px"}}>
      <div className='d-flex justify-content-between mx-3 mt-1 text-secondary'>
        <div className='d-flex'>
          <img src={tweet.avatarUrl} style={{ borderRadius: '50%' }}></img>
          <Typography sx={{ml: 1}}>{tweet.userName}</Typography>
        </div>
        <Typography>{moment(tweet.date).format('MMMM Do YYYY, H:mm')}</Typography>
      </div>
      <CardContent>
        <Typography align='left' sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', width: '100%' }}>{tweet.content}</Typography>
      </CardContent>
    </Card>
  )
}

export default Tweet;