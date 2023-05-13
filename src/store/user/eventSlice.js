import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PollService from '../../services/PollService';

const initialState = {
  link: null,
  isWaiting: true,
  event: null,
};

export const setAnswer = createAsyncThunk('event/setAnswer', async () => {
  try {
    const res = await PollService.getAll();
  } catch (e) {
    console.log(e);
  }
});

const eventSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setLink(state, action) {
      state.link = action.payload;
    },
    setIsWaiting(state, action) {
      state.isWaiting = action.payload;
    },
    setEvent(state, action) {
      state.isWaiting = false;
      state.event = action.payload;
    },
  },
});

export default eventSlice.reducer;
export const { setIsWaiting, setEvent } = eventSlice.actions;
