import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, PAGE_SIZE } from '../../config';
import type { Bill } from './billsSlice';

export const fetchBills = createAsyncThunk<
  { bills: Bill[]; totalPages: number },
  { token: string; page?: number; pageSize?: number },
  { rejectValue: string }
>(
  'bills/fetchBills',
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

      const { data } = await axios.get(`${API_URL}/bills`, config);

      return data as { bills: Bill[]; totalPages: number };
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
