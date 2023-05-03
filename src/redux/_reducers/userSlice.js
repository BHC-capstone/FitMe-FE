/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    isLogin: false,
    username: '',
    user_id: '',
    password: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLogin = true;
      state.user_name = action.payload.user_name;
      state.user_id = action.payload.user_id;
      state.password = action.payload.password;
    },
    logoutUser: state => {
      state.isLogIn = false;
      state.user_name = null;
      state.user_id = null;
      state.password = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
