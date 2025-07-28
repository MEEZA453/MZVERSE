// store.js
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index.js";

export const store = configureStore({
  reducer: reducers,
});
