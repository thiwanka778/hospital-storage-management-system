import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./features/loginSlice/loginSlice";
import signupReducer from "./features/signupSlice/signupSlice";
import typeReducer from "./features/typeSlice/typeSlice";
import itemReducer from "./features/itemSlice/itemSlice"

export const store = configureStore({
    reducer: {
      login:loginReducer,
      signup:signupReducer,
      type:typeReducer,
      item:itemReducer,
    },
  });