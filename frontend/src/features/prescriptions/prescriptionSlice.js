import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';

// Fetch all prescriptions
export const fetchPatientPrescriptions = createAsyncThunk(
  'patients/fetchPrescriptions',
  async (prescriptionId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/prescriptions/${patientId}`);
      return { prescriptionId, prescriptions: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch prescriptions' });
    }
  }
);

// Add a new prescription
export const createPrescription = createAsyncThunk(
  'prescriptions/addPrescription',
  async (data, thunkAPI) => {
    try {
      const response = await API.post('/api/prescriptions', data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientPrescriptions.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default prescriptionSlice.reducer;
