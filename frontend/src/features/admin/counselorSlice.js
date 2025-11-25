import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchCounselors = createAsyncThunk(
  'counselors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/api/counselors');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch counselors' });
    }
  }
);

// Create counselor
export const createCounselor = createAsyncThunk(
  'counselors/create',
  async (counselorData, { rejectWithValue }) => {
    try {
      const response = await API.post('/api/counselors', counselorData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to create counselor' });
    }
  }
);

// Update counselor
export const updateCounselor = createAsyncThunk(
  'counselors/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/api/counselors/${id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to update counselor' });
    }
  }
);

// Delete counselor
export const deleteCounselor = createAsyncThunk(
  'counselors/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/api/counselors/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to delete counselor' });
    }
  }
);

const counselorSlice = createSlice({
  name: 'counselors',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounselors.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchCounselors.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload; })
      .addCase(fetchCounselors.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload?.message || 'Error fetching counselors'; })

      .addCase(createCounselor.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateCounselor.fulfilled, (state, action) => {
        const index = state.list.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteCounselor.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.id !== action.payload);
      });
  },
});

export default counselorSlice.reducer;
