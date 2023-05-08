import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import QuizService from '../../services/QuizService';

const initialState = {
  items: [],
  status: 'fetching',

  isCreating: false,
  isEditing: false,

  editingItem: {
    title: '',
    questions: [
      {
        question: '',
        answers: [''],
      },
    ],
  },
};

export const fetchQuiz = createAsyncThunk(
  'quiz/fetchQuizStatus',
  async () => {
    try {
      const { data } = await QuizService.getAll();
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateQuiz = createAsyncThunk(
  'quiz/updateQuizStatus',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const updatedQuiz = state.quiz.editingItem; //id, new
      const quizId = updatedQuiz._id;

      const res = await QuizService.updateQuiz(quizId, updatedQuiz);
    } catch (e) {
      console.log(e);
    }
  }
);

export const createQuiz = createAsyncThunk(
  'quiz/createQuizStatus',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const body = state.quiz.editingItem;
      const res = await QuizService.createQuiz(body);
      if (res.status === 200) {
        thunkAPI.dispatch(deleteItem(body));
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
);
export const deleteQuiz = createAsyncThunk(
  'quiz/deleteQuizStatus',
  async (quizId, thunkAPI) => {
    try {
      const res = await QuizService.deleteQuiz(quizId);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    deleteItem(state, action) {
      const index = state.items.findIndex(
        (item) => item._id === action.payload
      );
      state.items.splice(index, 1);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setIsCreating(state, action) {
      state.isCreating = action.payload;
    },
    setEditingItem(state, action) {
      state.editingItem = action.payload;
    },
    setTitle(state, action) {
      state.editingItem.title = action.payload;
    },
    setQuestion(state, action) {
      const { questionIndex, newQuestion } = action.payload;
      state.editingItem.questions[questionIndex].question =
        newQuestion;
    },
    addQuestion(state) {
      state.editingItem.questions.push({
        question: '',
        answers: [''],
      });
    },
    setAnswer(state, action) {
      const { questionIndex, answerIndex, newAnswer } =
        action.payload;
      state.editingItem.questions[questionIndex].answers[
        answerIndex
      ] = newAnswer;
    },
    addAnswer(state, action) {
      const questionIndex = action.payload;
      state.editingItem.questions[questionIndex].answers.push('');
    },
    removeAnswer(state, action) {
      const { questionIndex, answerIndex } = action.payload;
      state.editingItem.questions[questionIndex].answers.splice(
        answerIndex,
        1
      );
    },
    removeQuestion(state, action) {
      const { questionIndex } = action.payload;
      state.editingItem.questions.splice(questionIndex, 1);
    },
  },
  extraReducers: {
    [fetchQuiz.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'fulfilled';
    },
    [fetchQuiz.pending]: (state, action) => {
      state.items = [];
      state.status = 'pending';
    },
    [fetchQuiz.rejected]: (state, action) => {
      state.items = action.payload;
      state.status = 'error';
    },
  },
});

export default quizSlice.reducer;

export const {
  setItems,
  deleteItem,
  setNewItem,
  setStatus,
  setIsEditing,
  setIsCreating,
  setEditingItem,
  addQuestion,
  setTitle,
  setQuestion,
  setAnswer,
  addAnswer,
  removeAnswer,
  removeQuestion,
} = quizSlice.actions;
