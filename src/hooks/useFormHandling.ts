import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { registerUser } from '../state/auth/authThunks';

type FormDataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Custom hook to handle form data and validation
export const useFormHandling = (data: FormDataType) => {
  const [formData, setFormData] = useState(data);
  const [customError, setCustomError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  // Form validation
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setCustomError('All fields are required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setCustomError('Passwords do not match');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setCustomError('Invalid email address');
      return false;
    }

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(formData.password)) {
      setCustomError(
        'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    }

    setCustomError('');
    return true;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (customError) {
      return;
    }

    dispatch(registerUser({ ...formData })).then((res) => {
      if (!('error' in res)) {
        setFormData(data);
      }
    });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    customError,
    validateForm,
  };
};
