import { configureStore } from '@reduxjs/toolkit';
import userSlice from './UserSlice';
import authMiddleware from './authMiddleware';
import compartmentSlice from './compartmentSlice';
import storyMiddleware from './storyMiddleware';
import StoriesSlice from './StoriesSlice';
import NotificationSlice from './notificationSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    compartment: compartmentSlice,
    stories: StoriesSlice,
    notification: NotificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, storyMiddleware),
});

export default store;
