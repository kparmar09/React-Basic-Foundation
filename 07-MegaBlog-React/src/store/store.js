import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

// In this project we are mainly using redux to track the user's status

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
