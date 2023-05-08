import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PollService from '../../services/PollService';

const initialState = {
  items: [],
  status: 'pending',

  isLoading: true,
  isEditing: false,

  editingItem: {},
};

export const fetchPolls = createAsyncThunk(
  'polls/fetchPollStatus',
  async () => {
    try {
      const { data } = await PollService.getAll();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setEditingItem(state, action) {
      state.editingItem = action.payload;
    },
  },
  extraReducers: {
    [fetchPolls.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    },
    [fetchPolls.pending]: (state, action) => {
      state.items = [];
      state.status = 'pending';
    },
    [fetchPolls.rejected]: (state, action) => {
      state.items = action.payload;
      state.status = 'error';
    },
  },
});

export default pollSlice.reducer;

export const { setItems, setIsEditing, setEditingItem } =
  pollSlice.actions;
