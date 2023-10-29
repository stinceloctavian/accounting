import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  registerUser,
  logInUser,
  fetchUser,
  LoginUserResponse,
  type RegisterUserResponse,
} from './authThunks';

export type UserInfo = {
  name: string;
  email: string;
};

export interface AuthState {
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  error: string | string[] | null;
  success: string | null;
}

// Initialize user token from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null, // for user object
  userToken, // for storing the token
  error: null,
  success: null, // for monitoring the registration process
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterUserResponse>) => {
          state.loading = false;
          state.success = action.payload.message; // registration successful
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | string[];
        state.success = null;
      })
      // log in user
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<LoginUserResponse>) => {
          state.loading = false;
          state.userToken = action.payload.accessToken;
          state.userInfo = action.payload.user;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const auth = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
