import React, {useState} from 'react';
//import {useSelector, useDispatch} from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register} from '../features/auth/authSlice'
import { userDataInterface } from '../types/types';
import {FormControl, InputLabel, Input, FormHelperText, Button, Paper} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData;

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
  const handleReset = () => console.log("");

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <div className="App">
      <Paper>
        <h1>Hello</h1>
        <div style={{marginBottom: '15px'}}>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name"
            name='name' 
            onChange={onChange}
            value={name}
            aria-describedby="Name Form" />
          </FormControl>
        </div>
        <div style={{marginBottom: '15px'}}>
          <FormControl>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email"
            name='email' 
            onChange={onChange}
            value={email}
            aria-describedby="Email Address Form" />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
          </FormControl>
        </div>
        <div style={{marginBottom: '15px'}}>
          <FormControl>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input id="password"
            name='password' 
            onChange={onChange}
            value={password}
            aria-describedby="Password Form" />
          </FormControl>
        </div>
        <div style={{marginBottom: '15px'}}>
          <FormControl>
            <InputLabel htmlFor="password2">Repeat Password</InputLabel>
            <Input id="password2"
            name='password2' 
            onChange={onChange}
            value={password2}
            aria-describedby="Repeat Password Form" />
          </FormControl>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Paper>
    </div>
  );
}

export default Register;