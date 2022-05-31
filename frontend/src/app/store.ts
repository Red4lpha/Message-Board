import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import messageReducer from '../features/messages/messagesSlice'

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    auth: authReducer,
    messages: messageReducer 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
