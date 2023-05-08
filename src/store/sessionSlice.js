import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SessionService from '../services/SessionService';
import sessionManager from '../AdminPanel/CreateSession/SessionManager';

const initialState = {
  status: 'pending',
  link: null,
};

export const createSession = createAsyncThunk(
  'session/creatingSessionStatus',
  async () => {
    try {
      const { data } = await SessionService.createSession();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const startEvent = createAsyncThunk(
  'session/startEvent',
  async ({ type, id }, thunkAPI) => {
    try {
      const link = thunkAPI.getState().session.link;
      const res = await SessionService.addEvent(link, type, id);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: {
    [createSession.fulfilled]: (state, action) => {
      state.link = action.payload.link;
      state.status = 'fulfilled';
    },
    [createSession.pending]: (state, action) => {
      state.link = null;
      state.status = 'pending';
    },
    [createSession.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});
export default sessionSlice.reducer;

export const {} = sessionSlice.actions;
