import React, {useEffect} from 'react';
import {Avatar, Button, CssBaseline, TextField, Box, Typography, Container, ButtonGroup, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControls } from './FormControls';

const theme = createTheme();

//? Expected form fields
const inputFieldValues = [
  {
    name: 'name',
    label: 'Username'
  },
  {
    name: 'email',
    label: 'Email Address',
    autoComplete: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'password2',
    label: 'Confirm Password',
    type: 'password'
  }
];


const Register = () => {
  const {
    handleChange,
    handleFormSubmit,
    handleReset,
    formIsValid,
    errors,
    errorPrompt,
    values,
    setForm
  } = FormControls();

  useEffect(() => {
    setForm('register')
  }, [setForm])

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
        
        {(errorPrompt !== '') ? 
          <Alert severity="error">
            {errorPrompt}
          </Alert>
        : null}
        <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
          {inputFieldValues.map((field, index) => {
              return (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  key={index}
                  id={field.name}
                  label={field.label}
                  name={field.name}
                  autoComplete={field.autoComplete ?? 'none'}
                  type={field.type ?? 'none'}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleChange}
                  autoFocus
                  error={errors[field.name]}
                  {...(errors[field.name] && {
                    error: true,
                    helperText: errors[field.name]
                  })}
                />
              )
            })} 

          <ButtonGroup fullWidth>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 3 }}
              disabled={!formIsValid()} 
            >
              Register
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