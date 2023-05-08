import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/AuthService';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { API_URL } from '../http';

const initialState = {
  user: {},
  isAuth: false,
  isAdmin: false,
  isLoading: false,
  registrationError: null,
  loginError: null,
  registrationSuccess: false,
};

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    console.log('checking auth');
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem('token', response.data.accessToken);
      thunkAPI.dispatch(setAuth(true));
      thunkAPI.dispatch(setUser(response.data.user));
    } catch (e) {
      console.log(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const login = createAsyncThunk(
  'login',
  debounce(async (params, thunkAPI) => {
    const { email, password } = params;
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      thunkAPI.dispatch(setAuth(true));
      thunkAPI.dispatch(setUser(response.data.user));
    } catch (e) {
      console.log(e);
      const error = e.response?.data?.message;
      if (error) thunkAPI.dispatch(setLoginError(error));
    }
  }, 500)
);

export const registration = createAsyncThunk(
  'registration',
  async (params, thunkAPI) => {
    const { username, email, password } = params;
    try {
      const response = await AuthService.registration(
        username,
        email,
        password
      );
      console.log(response);
      //localStorage.setItem('token', response.data.accessToken);
      //thunkAPI.dispatch(setAuth(true))

      thunkAPI.dispatch(setRegistrationSuccess());
    } catch (e) {
      console.log(e.response?.data?.message);
      const error = e.response?.data?.message;
      if (error) thunkAPI.dispatch(setRegistrationError(error));
    }
  }
);

export const logout = createAsyncThunk(
  'logout',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');
      thunkAPI.dispatch(setAuth(false));
      thunkAPI.dispatch(setUser({}));
    } catch (e) {
      console.log(e);
      console.log(e.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      console.log('setting user');
      console.log(action.payload);
      state.user = { ...action.payload };
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setRegistrationError(state, action) {
      state.registrationError = action.payload;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
    },
    setRegistrationSuccess(state) {
      state.registrationSuccess = true;
    },
  },
});

export const {
  setAuth,
  setUser,
  setLoading,
  setRegistrationError,
  setLoginError,
  setRegistrationSuccess,
} = userSlice.actions;
export default userSlice.reducer;
