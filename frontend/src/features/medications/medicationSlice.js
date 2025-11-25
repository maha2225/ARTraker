import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

export const fetchMedications = createAsyncThunk(
  'medications/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/api/medications');
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const medicationSlice = createSlice({
  name: 'medications',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedications.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export default medicationSlice.reducer;
