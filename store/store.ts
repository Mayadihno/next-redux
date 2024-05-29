import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import cartSlice from "./slice/cartSlice";
import formSlice from "./slice/formSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
    form: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
