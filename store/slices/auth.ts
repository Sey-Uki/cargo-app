import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) =>
  state.auth.isLoggedIn;

export default authSlice.reducer;