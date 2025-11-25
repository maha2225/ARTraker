import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Fetch all patients
export const fetchPatients = createAsyncThunk(
  'patients/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/api/users'); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch patients' });
    }
  }
);

// Create a new patient
export const createPatient = createAsyncThunk(
  "patients/create",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/users", formData);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error creating patient" });
    }
  }
);
// Fetch a single patient by ID
export const fetchPatientById = createAsyncThunk(
  "patients/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/users/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch patient");
    }
  }
);

// Add/update adherence for a patient
export const createPatientAdherence = createAsyncThunk(
  "patients/createAdherence",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/api/users/${id}/adherence`, data);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to update adherence" });
    }
  }
);

// Fetch adherence records for a patient
export const fetchPatientAdherence = createAsyncThunk(
  'patients/fetchAdherence',
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/users/${patientId}/adherence`);
      return { patientId, adherenceRecords: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch adherence' });
    }
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
  list: [],
  status: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
  adherenceStatus: "idle",
  adherenceError: null,
  currentPatient: null, // <-- for single patient
  currentPatientStatus: "idle",
  currentPatientError: null,
},

  reducers: {
    resetPatients: (state) => {
      state.list = [];
      state.status = 'idle';
      state.error = null;
      state.createStatus = 'idle';
      state.createError = null;
      state.adherenceStatus = 'idle';
      state.adherenceError = null;
    },
  clearPatient: (state) => {
    state.currentPatient = null;
    state.currentPatientStatus = "idle";
    state.currentPatientError = null;
  }
  },
  extraReducers: (builder) => {
    builder
      // fetchPatients
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch patients";
      })

      // createPatient
      .addCase(createPatient.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload?.message || "Error creating patient";
      })

      // createPatientAdherence
      .addCase(createPatientAdherence.pending, (state) => {
        state.adherenceStatus = "loading";
        state.adherenceError = null;
      })
      .addCase(createPatientAdherence.fulfilled, (state, action) => {
        state.adherenceStatus = "succeeded";
        const updatedPatient = action.payload;
        const index = state.list.findIndex(p => p.id === updatedPatient.id);
        if (index !== -1) {
          // Only update adherence-related fields
          state.list[index] = {
            ...state.list[index],
            adherenceRecords: updatedPatient.adherenceRecords,
            monthlyAdherenceRate: updatedPatient.monthlyAdherenceRate,
            daysMissed: updatedPatient.daysMissed,
            lastClinicVisit: updatedPatient.lastClinicVisit,
            nextAppointment: updatedPatient.nextAppointment,
          };
        }
      })
      .addCase(createPatientAdherence.rejected, (state, action) => {
        state.adherenceStatus = "failed";
        state.adherenceError = action.payload?.message || "Failed to update adherence";
      })

      // fetchPatientAdherence
      .addCase(fetchPatientAdherence.pending, (state) => {
        state.adherenceStatus = "loading";
        state.adherenceError = null;
      })
      .addCase(fetchPatientAdherence.fulfilled, (state, action) => {
        state.adherenceStatus = "succeeded";
        const { patientId, adherenceRecords } = action.payload;
        const patient = state.list.find(p => p.id === patientId);
        if (patient) {
          patient.adherenceRecords = adherenceRecords;
        }
      })
      .addCase(fetchPatientAdherence.rejected, (state, action) => {
        state.adherenceStatus = "failed";
        state.adherenceError = action.payload?.message || "Failed to fetch adherence";
      })
      .addCase(fetchPatientById.pending, (state) => {
    state.currentPatientStatus = "loading";
    state.currentPatientError = null;
  })
  .addCase(fetchPatientById.fulfilled, (state, action) => {
    state.currentPatientStatus = "succeeded";
    state.currentPatient = action.payload;
  })
  .addCase(fetchPatientById.rejected, (state, action) => {
    state.currentPatientStatus = "failed";
    state.currentPatientError = action.payload;
  });
  },
});

export const { resetPatients, clearPatient } = patientsSlice.actions;
export default patientsSlice.reducer;
