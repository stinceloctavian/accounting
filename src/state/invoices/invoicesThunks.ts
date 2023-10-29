import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, PAGE_SIZE } from '../../config';
import type { Invoice } from './invoicesSlice';

export const fetchInvoices = createAsyncThunk<
  { invoices: Invoice[]; totalPages: number },
  { token: string; page?: number; pageSize?: number },
  { rejectValue: string }
>(
  'invoices/fetchInvoices',
  async ({ token, page = 0, pageSize = PAGE_SIZE }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
        params: {
          skip: page,
          take: pageSize,
        },
      };

      const { data } = await axios.get(`${API_URL}/invoices`, config);

      return data as { invoices: Invoice[]; totalPages: number };
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
