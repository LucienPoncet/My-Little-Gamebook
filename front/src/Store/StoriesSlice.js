import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  stories: [],
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    getAllStories: (state, action) => {
      return {
        ...state,
        stories: action.payload,
      };
    },
  },
});

export const { getAllStories } = storiesSlice.actions;

export default storiesSlice.reducer;
