import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config';
import { RootState } from '../store';
import type { UserInfo } from './authSlice';

type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  message: string;
};

type LoginUserPayload = Omit<RegisterUserPayload, 'name'>;

export type LoginUserResponse = {
  user: UserInfo;
  accessToken: string;
};

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const registerUser = createAsyncThunk<RegisterUserResponse, RegisterUserPayload, { rejectValue: string | string[] }>(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/register`,
        { name, email, password },
        { headers }
      );

      return data as RegisterUserResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

export const logInUser = createAsyncThunk<LoginUserResponse, LoginUserPayload, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { headers }
      );

      // store user's token in local storage
      localStorage.setItem('userToken', data.accessToken);

      return data as LoginUserResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  }
);

export const fetchUser = createAsyncThunk<UserInfo, { token: string; id: number }, { rejectValue: string }>(
  'auth/fetchUser',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/users/${id}`, {
        headers: { ...headers, Authorization: `Bearer ${token}` },
      });

      return data as UserInfo;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  },
  {
    condition: (_, api) => {
      const { auth } = api.getState() as RootState;

      if (auth.userInfo) {
        return false;
      }
    },
  }
);
