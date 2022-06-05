import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import messagesService from './messagesService'
import { messagesDataInterface } from '../../types/types';
import { AxiosError } from 'axios'

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface initialStateInterface {
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string,
  messagesArray: any[]
}

//? Get user from localStorage

const initialState: initialStateInterface = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  messagesArray: []
}

//? Get all the messages
export const getMessages = createAsyncThunk<{  rejectValue: ValidationErrors}>(
  'messages/getMessages',
  async () => {
    try {
      return await messagesService.getMessages();
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if(!error.message){
        throw err;
      }
      const message =
        (error.response &&
          error.response.data) ||
        error.message ||
        error.toString();
        return message;
    }
  }
)

//? Create a top level post
export const createMessage = createAsyncThunk<{  rejectValue: ValidationErrors}, messagesDataInterface>(
  'messages/createMessage',
  async (messageText, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.createMessage(messageText, token);
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if(!error.message){
        throw err;
      }
      const message =
        (error.response &&
          error.response.data) ||
        error.message ||
        error.toString();
        return message;
    }
  }
)

//? Vote on a message
export const voteMessage = createAsyncThunk<{  rejectValue: ValidationErrors}, messagesDataInterface>(
  'messages/voteMessage',
  async ( messageData, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.voteMessage(messageData, token);
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if(!error.message){
        throw err;
      }
      const message =
        (error.response &&
          error.response.data) ||
        error.message ||
        error.toString();
        return message;
    }
  }
)

export const messagesSlice = createSlice ({
  name: 'message',
  initialState,
  reducers: {
    reset: (state) => initialState,

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      //TODO: Change the PayloadAction from any
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messagesArray = action.payload
      })
      .addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messagesArray.push(action.payload)
      })
      .addCase(createMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(voteMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(voteMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
      })
      .addCase(voteMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = messagesSlice.actions;
export default messagesSlice.reducer