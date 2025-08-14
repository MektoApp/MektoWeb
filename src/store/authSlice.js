import { createSlice } from '@reduxjs/toolkit';
import { login as loginApi, logout as logoutApi } from '../api/authService';

const storedUser = JSON.parse(localStorage.getItem('user')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: storedUser },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  const user = await loginApi(username, password);
  dispatch(setUser(user));
};

export const logout = () => (dispatch) => {
  logoutApi();
  dispatch(clearUser());
};

export default authSlice.reducer;
