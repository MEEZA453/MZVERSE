import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
});

// ✅ Types for usage in app
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
