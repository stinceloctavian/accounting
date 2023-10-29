import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { auth } from '../state/auth/authSlice';
import type { ToggleButton } from '../pages/HomePage';
import { useFormHandling } from '../hooks/useFormHandling';
import InputField from './InputField';

// This component is used to display the register form
const Register = ({
  setToggle,
}: {
  setToggle: (ev: React.MouseEvent<HTMLElement>, type: ToggleButton) => void;
}) => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    customError,
    validateForm,
  } = useFormHandling({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { success, error, loading } = useSelector(auth);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {success && <Alert severity='success'>{success}</Alert>}
      {customError && <Alert severity='error'>{customError}</Alert>}
      {error ? (
        Array.isArray(error) ? (
          error.map((err) => <Alert severity='error'>{err}</Alert>)
        ) : (
          <Alert severity='error'>{error}</Alert>
        )
      ) : null}
      <InputField
        data={{
          type: 'text',
          name: 'name',
          value: formData.name,
          id: 'name',
          label: 'Name',
        }}
        handleChange={handleInputChange}
      />
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
      <InputField
        data={{
          type: 'password',
          name: 'confirmPassword',
          value: formData.confirmPassword,
          id: 'confirmPassword',
          label: 'Confirm Password',
        }}
        handleChange={handleInputChange}
      />
      <Button
        type='submit'
        onClick={validateForm}
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
        fullWidth
      >
        Register
      </Button>
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link href='' onClick={(e) => setToggle(e, 'login')} variant='body2'>
            Already have an account? LogIn
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
