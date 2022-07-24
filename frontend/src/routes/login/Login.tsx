import {Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControls } from '@/features/users/FormControls';

const theme = createTheme();

//? Expected form fields
const inputFieldValues = [
  {
    name: 'email',
    label: 'Email Address',
    autoComplete: 'email'
  },
  {
    name: 'password',
    label: 'Password',
  }
];

const Login = () => {
  
  const {
    handleChange,
    handleFormSubmit,
    formIsValid,
    errors,
    errorPrompt,
    values
  } = FormControls();


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
          Sign in
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
                key={index}
                margin="normal"
                required
                fullWidth
                id={field.name}
                label={field.label}
                error={errors[field.name]}
                name={field.name}
                autoComplete={field.autoComplete ?? 'none'}
                type={field.name}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleChange}
                autoFocus
                {...(errors[field.name] && {
                  error: true,
                  helperText: errors[field.name]
                })}
              />
            )
          })} 

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!formIsValid()}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

    </Container>
  </ThemeProvider>
  )
}

export default Login