import {useState} from 'react';
import { useAppDispatch } from '../app/hooks';
import { login} from '../features/auth/authSlice'
import { userDataInterface } from '../types/types';
import {FormControl, InputLabel, Input, Button, Paper} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;
  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData: userDataInterface = {
      email,
      password,
    }
    //const temp: string = 'temp'
    dispatch(login(userData))
  }
  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="App">
    <Paper>
      <h1>LOGIN</h1>
      <div style={{marginBottom: '15px'}}>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input id="email"
          name='email' 
          onChange={onChange}
          value={email}
          aria-describedby="Email Address Form" />
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
      <Button onClick={handleSubmit}>LOGIN</Button>
    </Paper>
  </div>
  )
}

export default Login