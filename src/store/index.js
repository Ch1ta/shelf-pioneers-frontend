import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import quizReducer from './admin/quizSlice';
import pollReducer from './admin/pollSlice';
import sessionReducer from './admin/sessionSlice';
import userSessionReducer from './user/eventSlice';

export const store = configureStore({
  reducer: {
    user: authReducer,
    quiz: quizReducer,
    poll: pollReducer,
    session: sessionReducer,
    //user
    userSession: userSessionReducer,
  },
});
