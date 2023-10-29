import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchInvoices } from './invoicesThunks';

export type Invoice = {
  id: number;
  amount: number;
  due_at: string;
  document_number: string;
  user_id: number;
  status?: string;
  contact_email?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_address?: string;
  notes?: string;
};

interface InvoicesState {
  invoicesData: Invoice[];
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InvoicesState = {
  invoicesData: [],
  totalPages: 0,
  status: 'idle',
  error: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchInvoices.fulfilled,
        (
          state,
          action: PayloadAction<{ invoices: Invoice[]; totalPages: number }>
        ) => {
          state.status = 'succeeded';
          state.invoicesData = action.payload.invoices;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const invoices = (state: RootState) => state.invoices;
export default invoicesSlice.reducer;
