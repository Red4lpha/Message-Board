import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/users/api/authSlice';
import messageReducer from '../features/comments/api/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
