import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type OrderItem = {
  id: string;
  location: string
  weight: string;
  volume: string;
  cost: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type UserDataState = {
  list: OrderItem[];
};

const initialState: UserDataState = {
  list: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderItem[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.list;

export default ordersSlice.reducer;
