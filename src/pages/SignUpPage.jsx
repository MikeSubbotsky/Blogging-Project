import React, {useState, useContext} from 'react'
import { IsLoggedIn, UserID, UserLogin } from '../lib/Context';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';




function SignUpPage() {
    const { setIsLoggedIn } = useContext(IsLoggedIn);
    const { setUserID } = useContext(UserID);
    const { setUserLogin } = useContext(UserLogin);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();
    


const handleSubmitSignUp = async (event) => {
  event.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    setIsLoggedIn(true);
    setUserID(user.uid);
    navigate('/profile');
  } catch (error) {
    console.log(error);
    alert('Sign up error:', error);
  }
};


    const handleGoogleSignUp = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
                  setIsLoggedIn(true);
                  setUserID(user.uid);
                  const userDoc = doc(collection(db, "users"), user.uid);
                  const userData = await getDoc(userDoc);
                  if (userData && userData.data() && userData.data().name) {
                    setUserLogin(userData.data().name);
                    navigate('/home');
                  } else {
                    navigate('/profile');
                  }
          } catch (error) {
            console.log(error);
            alert('Login error:', error);
          }
        };
    
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmitSignUp} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Button 
                            onClick={handleGoogleSignUp} 
                            fullWidth
                            variant="outlined"
                            color='secondary'
                            sx={{ mb: 2 }}
                            >
                            Sign up with Google
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/login" variant="body2">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
          </Box>
        </Box>   
      </Container>   
    </>
  )
}

export default SignUpPage