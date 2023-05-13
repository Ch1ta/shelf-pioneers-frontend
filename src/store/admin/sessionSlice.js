import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SessionService from '../../services/SessionService';

const initialState = {
  status: 'pending',
  link: null,
  openSessions: [],
  currentSession: {},
};

export const getOpenSessions = createAsyncThunk(
  'session/getOpenSessions',
  async (_, thunkAPI) => {
    try {
      const { data } = await SessionService.getOpenSessions();
      thunkAPI.dispatch(setOpenSessions(data));
    } catch (e) {
      console.log(e);
    }
  }
);

export const getSession = createAsyncThunk(
  'session/getSessionStatus',
  async (link, thunkAPI) => {
    try {
      const res = await SessionService.getSession(link);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const createSession = createAsyncThunk(
  'session/creatingSessionStatus',
  async () => {
    try {
      const res = await SessionService.createSession();
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const closeSession = createAsyncThunk(
  'session/closeSession',
  async (link, thunkAPI) => {
    try {
      const res = await SessionService.closeSession(link);
      if (res.status === 201) {
        thunkAPI.dispatch(setCurrentSession({}));
        thunkAPI.dispatch(getOpenSessions());
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const setCurrentEvent = createAsyncThunk(
  'session/setCurrentEvent',
  async ({ type, id, timer }, thunkAPI) => {
    try {
      const link = thunkAPI.getState().session.currentSession.link;
      const res = await SessionService.setCurrentEvent(link, type, id);
      thunkAPI.dispatch(setCurrentSession(res.data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const closeCurrentEvent = createAsyncThunk(
  'session/closeCurrentEvent',
  async (link, thunkAPI) => {
    try {
      const res = await SessionService.closeCurrentEvent(link);
      if (res.status === 200) {
        thunkAPI.dispatch(getSession(link));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCurrentSession(state, action) {
      state.currentSession = action.payload;
    },
    setOpenSessions(state, action) {
      state.openSessions = action.payload;
    },
    setLink(state, action) {
      state.link = action.payload;
    },
  },
  extraReducers: {
    [createSession.fulfilled]: (state, action, dispatch) => {
      state.currentSession = action.payload;
      state.status = 'fulfilled';
    },
    [createSession.pending]: (state, action) => {
      state.link = null;
      state.status = 'pending';
    },
    [createSession.rejected]: (state, action) => {
      state.status = 'error';
    },

    [getSession.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.currentSession = action.payload;
      state.status = 'fulfilled';
    },
    [getSession.pending]: (state, action) => {
      state.link = null;
      state.status = 'pending';
    },
    [getSession.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});
export default sessionSlice.reducer;

export const { setOpenSessions, setLink, setCurrentSession } = sessionSlice.actions;
