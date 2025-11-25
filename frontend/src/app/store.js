import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import prescriptionReducer from '../features/prescriptions/prescriptionSlice';

import patientsReducer from '../features/patient/patientsSlice';
import counselorReducer from '../features/admin/counselorSlice';
import medicationReducer from '../features/medications/medicationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prescriptions: prescriptionReducer,
    patients: patientsReducer,
    counselors: counselorReducer,
    medications: medicationReducer,
  },
});

export default store;
