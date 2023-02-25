import React, { useContext, useState } from 'react';
import { UserLogin, UserID } from '../lib/Context';
import { Button, TextField } from '@mui/material';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../lib/firebase';



function ProfilePage() {
  const { userLogin } = useContext(UserLogin);
  const { userID } = useContext(UserID);
  const [loginInput, setLoginInput] = useState(userLogin);

  

    async function saveUserName() {
      
  try {
      const usersCol = collection(db, "users");
      const userRef = doc(usersCol, userID);
      await setDoc(userRef, { name: loginInput });
  } catch (error) {
    console.error('Error setting user name:', error);
  }
    }

    async function generateAvatar () {
      const avatarBaseUrl = 'https://i.pravatar.cc/30?img=';
      const maxAvatarNumber = 70;
  
  const generateRandomAvatarUrl = () => {
    const randomNumber = Math.floor(Math.random() * maxAvatarNumber) + 1;
    return `${avatarBaseUrl}${randomNumber}`;
};
      const avatarUrl = generateRandomAvatarUrl();
      const userDocRef = doc(db, 'users', userID);
      await setDoc(userDocRef, { avatarUrl }, { merge: true });
    }

  return (
    <>
      <div className='position-relative mx-auto' style={{ width: "500px"}}>
        <h1 style={{ textAlign: "left"}}>Profile</h1>
        <p style={{ textAlign: "left"}}>User Name</p>
        <TextField 
          placeholder='Enter your user name...'
          sx={{ width:"100%" }}
          value={loginInput}
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
        <br />
        <Button 
          disabled={!loginInput ? true : false}  
          variant="contained" 
          onClick={generateAvatar} 
          sx={{  
            position: 'absolute',
            background: "#007BFF",
            mt: 5,
            right: "0px"}}>
          Generate Avatar
        </Button>
      </div>
    </>
  )
}

export default ProfilePage;