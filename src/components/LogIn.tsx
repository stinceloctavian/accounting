import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { auth } from '../state/auth/authSlice';
import { logInUser } from '../state/auth/authThunks';
import { AppDispatch } from '../state/store';
import type { ToggleButton } from '../pages/HomePage';
import InputField from './InputField';

// This component is used to display the login form
const LogIn = ({
  setToggle,
}: {
  setToggle: (ev: React.MouseEvent<HTMLElement>, type: ToggleButton) => void;
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { error, loading } = useSelector(auth);
  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(logInUser({ ...formData }));
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error && <Alert severity='error'>{error}</Alert>}
      <InputField
        data={{
          type: 'email',
          name: 'email',
          value: formData.email,
          id: 'email',
          label: 'Email Address',
        }}
        handleChange={handleInputChange}
      />
      <InputField
        data={{
          type: 'password',
          name: 'password',
          value: formData.password,
          id: 'password',
          label: 'Password',
        }}
        handleChange={handleInputChange}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link
            href=''
            onClick={(e) => setToggle(e, 'register')}
            variant='body2'
          >
            Don't have an account? Register
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogIn;
