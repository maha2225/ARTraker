import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
import { resetPatients } from '../patient/patientsSlice';
const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('token');

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post('/api/auth/login', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return { user: response.data.user, token: response.data.token };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Login failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    status: savedToken && savedUser ? 'authenticated' : 'idle',
    error: null,
  },
  reducers: {
  logout: (state) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    state.user = null;
    state.token = null;
    state.status = 'idle';
    state.error = null;
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || action.error?.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
