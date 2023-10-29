import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { auth } from '../state/auth/authSlice';

// This component is used to display the protected routes
const ProtectedRoutes = () => {
  const { userToken } = useSelector(auth);

  // Show unauthorized screen if no user is found in redux store
  if (!userToken) {
    return (
      <Box className='flex flex-col items-center mt-4'>
        <Typography component='h1' variant='h1' sx={{ mb: 2 }}>
          Unauthorized :(
        </Typography>
        <Typography component='h6' variant='h6'>
          Navigate to{' '}
          <NavLink to='/' className='text-blue-600 hover:underline'>
            Homepage
          </NavLink>{' '}
          to gain access
        </Typography>
      </Box>
    );
  }

  // Returns child route elements
  return <Outlet />;
};

export default ProtectedRoutes;
