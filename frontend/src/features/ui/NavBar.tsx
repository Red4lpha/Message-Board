import * as React from 'react';
import {AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import {AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../users/api/authSlice';

export const NavBar = () => {
  const {user} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate(); 
  const routeChange = (event: React.MouseEvent<HTMLElement>) =>{ 
    let path = `/${event.currentTarget.id}`; 
    navigate(path);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          {!user && (
            
            <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={routeChange}
                  color="inherit"
                  id="login"
                >
                  <Typography variant="h6" sx={{ flexGrow: 1 }} paddingRight="10px">
                    Login
                  </Typography>
                  <LoginIcon />
              </IconButton>

            <IconButton
              size="large"
              aria-label="register user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={routeChange}
              color="inherit"
              name="register"
              id="register"
            >
                <Typography variant="h6" sx={{ flexGrow: 1 }} paddingRight="10px">
                  Register
                </Typography>
                <AccountCircle />
              </IconButton>
              
            </div>
            
          )}
          {user && (
            <>
              <Typography variant="h6" component="div" >
                {user.name}
              </Typography>
              
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => dispatch(logout())}
                edge="end">  

                <Typography variant="h6" 
                  component="div"
                  align="right"
                  paddingRight="10px">
                  Logout
                </Typography>
                <LogoutIcon />
              </IconButton>
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
