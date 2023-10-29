import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import invoicesSlice from './invoices/invoicesSlice';
import billsSlice from './bills/billsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    bills: billsSlice,
    invoices: invoicesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
