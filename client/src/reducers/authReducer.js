import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    admin: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.admin = action.payload.admin;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const { setAuth, setIsLogin, setAdmin } = authSlice.actions;
export default authSlice.reducer;
