import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import quizReducer from './quizSlice';
import pollReducer from './pollSlice';
import sessionReducer from './sessionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    poll: pollReducer,
    session: sessionReducer,
  },
});
