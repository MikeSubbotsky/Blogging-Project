import React, {useContext, useState} from 'react';
import { TweetsArray, UserLogin } from '../lib/Context';
import { Button, TextField } from '@mui/material';


function ProfilePage() {
  const { userLogin, setUserLogin } = useContext(UserLogin);
  const [loginInput, setLoginInput] = useState('');
  const { dispatch } = useContext(TweetsArray);

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
          right
          sx={{  
            position: 'absolute',
            background: "#007BFF",
            mt: 1,
            right: "0px"}}>
          Save
        </Button>
      </div>
      {userLogin === 'Mike' ? <button className='btn btn-danger' onClick={() => dispatch ({ type: 'DELETE_ALL_TWEETS' })} style={{ position: "fixed", bottom: "0px", right: "0px"}}>Secret Button</button> : ''}
    </>
  )
}

export default ProfilePage;