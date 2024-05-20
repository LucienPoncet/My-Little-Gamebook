import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
  compartmentData: '',
};

const compartmentSlice = createSlice({
  name: 'compartment',
  initialState,
  reducers: {
    getCompartment: (state, action) => {
      return {
        ...state,
        id: action.payload,
      };
    },
    loadCompartment: (state, action) => {
      return {
        ...state,
        compartmentData: action.payload,
      };
    },
    getCompartmentBeginning: (state, action) => {
      return {
        ...state,
        id: action.payload,
      };
    },
  },
});

export const { getCompartment, loadCompartment, getCompartmentBeginning } = compartmentSlice.actions;

export default compartmentSlice.reducer;
