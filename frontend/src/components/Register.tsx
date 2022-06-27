import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register, reset} from '../features/auth/authSlice'
import { userDataInterface } from '../types/types';
import {Avatar, Button, CssBaseline, TextField, Box, Typography, Container, ButtonGroup } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: ""
};
const Register = () => {
  const [{name, email, password, password2}, setFormData] = useState(initialState)
  const {user, isLoading, isSuccess, isError, message} = useAppSelector((state) => state.auth)
  const navigate = useNavigate(); 

  //const {user, isLoading, isError, isSuccess, message,} = useAppSelector((state: any) => state.auth)

  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(password !== password2) {
      console.log('Passwords do not match')
    } else {
      const userData: userDataInterface = {
        name,
        email,
        password,
      }
      //const temp: string = 'temp'
      dispatch(register(userData))
    }
  }
  //TODO: Write out handle reset logic
  const handleReset = () => {
    setFormData(initialState)
  }

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
  return (
    <ThemeProvider theme={theme}>
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="name"
              value={name}
              onChange={onChange}
              autoFocus
            />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={onChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            value={password2}
            onChange={onChange}
          />
          <ButtonGroup fullWidth>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 3 }}
            >
              Sign In
            </Button>
            <Button
              onClick={handleReset}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

    </Container>
  </ThemeProvider>
  );
}

export default Register;