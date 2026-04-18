import { configureStore } from '@reduxjs/toolkit';
import decisionReducer from './decisionSlice';

export const store = configureStore({
  reducer: {
    decision: decisionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;