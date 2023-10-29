import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { auth } from '../state/auth/authSlice';
import Register from '../components/Register';
import LogIn from '../components/LogIn';

export type ToggleButton = 'login' | 'register';

// This component is used to display the home page
const HomePage = () => {
  const [toggleForms, setToggleForms] = useState<ToggleButton>('login');
  const { userToken } = useSelector(auth);
  const navigate = useNavigate();

  // Handle toggle button
  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newToggle: ToggleButton
  ) => {
    event.preventDefault();
    setToggleForms(newToggle);
  };

  // Redirect authenticated user
  useEffect(() => {
    if (userToken) {
      navigate('/bills');
    }
  }, [userToken, navigate]);

  return (
    <>
      <Typography component='h2' variant='h2' textAlign='center'>
        Welcome!
      </Typography>
      {!userToken ? (
        <Container maxWidth='xs'>
          <Box className='flex flex-col items-center mt-4'>
            <ToggleButtonGroup
              value={toggleForms}
              exclusive
              onChange={handleToggle}
              aria-label='toggle btns'
            >
              <ToggleButton
                value='register'
                aria-label='justified'
                color='primary'
              >
                Register
              </ToggleButton>
              <ToggleButton
                value='login'
                aria-label='justified'
                color='primary'
              >
                Log In
              </ToggleButton>
            </ToggleButtonGroup>
            {toggleForms === 'register' && (
              <Register setToggle={handleToggle} />
            )}
            {toggleForms === 'login' && <LogIn setToggle={handleToggle} />}
          </Box>
        </Container>
      ) : (
        ''
      )}
    </>
  );
};

export default HomePage;
