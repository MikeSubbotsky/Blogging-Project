import React, {useContext, useState} from 'react';
import { UserLogin } from '../lib/Context';
import { Button, TextField } from '@mui/material';


function ProfilePage() {
  const { setUserLogin } = useContext(UserLogin);
  const [loginInput, setLoginInput] = useState('');


  function saveUserName() {
    setUserLogin(loginInput);
  }

  return (
    <>
      <div className='position-relative mx-auto' style={{ width: "500px"}}>
        <h1 style={{ textAlign: "left"}}>Profile</h1>
        <p style={{ textAlign: "left"}}>User Name</p>
        <TextField 
          placeholder='Enter your user name...' 
          sx={{ width:"100%" }} 
          onChange={(e) => setLoginInput(e.target.value)}/> 
        <br />
        <Button 
          disabled={!loginInput ? true : false}  
          variant="contained" 
          onClick={saveUserName} 
          sx={{  
            position: 'absolute',
            background: "#007BFF",
            mt: 1,
            right: "0px"}}>
          Save
        </Button>
      </div>
    </>
  )
}

export default ProfilePage;