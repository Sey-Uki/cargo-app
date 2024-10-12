import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type UserData = {
  email: string;
  phone: string;
  code: string;
  password: string;
  firstName: string;
  lastName: string;
  userId: string;
};

export type UserDataState = {
  data: UserData | null;
};

const initialState: UserDataState = {
  data: null,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user.data;

export default userSlice.reducer;
