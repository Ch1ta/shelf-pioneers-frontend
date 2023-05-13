import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PollService from '../../services/PollService';
import QuizService from '../../services/QuizService';
import { fetchQuiz } from './quizSlice';

const initialState = {
  items: [],
  status: 'pending',

  mode: null,

  editingItem: {
    title: '',
    questions: [''],
  },
};

export const fetchPolls = createAsyncThunk('polls/fetchPollStatus', async () => {
  try {
    const { data } = await PollService.getAll();
    return data;
  } catch (e) {
    console.log(e);
  }
});

export const createPoll = createAsyncThunk('quiz/createPoll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const body = state.poll.editingItem;
    console.log(body);
    const res = await PollService.createPoll(body);
    console.log(res.data);
    if (res.status === 201) {
      thunkAPI.dispatch(setEditingItem(res.data));
    }
  } catch (e) {
    console.log(e);
  }
});

export const updatePoll = createAsyncThunk('polls/updatePoll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const updatedPoll = state.poll.editingItem; //id, new
    const pollId = updatedPoll._id;

    const { data } = await PollService.updatePoll(pollId, updatedPoll);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
});

export const deletePoll = createAsyncThunk(
  'quiz/deletePoll',
  async (pollId, thunkAPI) => {
    try {
      const res = await PollService.deletePoll(pollId);
      console.log('de;lete ', res);
      if (res.status === 200) {
        thunkAPI.dispatch(fetchPolls());
      }
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
    resetEditingItem(state) {
      state.editingItem = initialState.editingItem;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    setEditingItem(state, action) {
      state.editingItem = action.payload;
    },
    setTitle(state, action) {
      state.editingItem.title = action.payload;
    },
    setQuestion(state, action) {
      const { questionIndex, newQuestion } = action.payload;
      state.editingItem.questions[questionIndex] = newQuestion;
    },
    addQuestion(state, action) {
      state.editingItem.questions.push('');
    },
    removeQuestion(state, action) {
      const questionIndex = action.payload;
      state.editingItem.questions.splice(questionIndex, 1);
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

export const {
  setItems,
  setMode,
  resetEditingItem,
  setEditingItem,
  setTitle,
  setQuestion,
  addQuestion,
  removeQuestion,
} = pollSlice.actions;
