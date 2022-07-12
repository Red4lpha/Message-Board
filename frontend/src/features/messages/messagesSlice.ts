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
  replyMessage: any,
  messageId: string,
  messagesArray: any[],
}

const initialState: initialStateInterface = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  replyMessage: null,
  messageId: '',
  messagesArray: [],
}

//? Get all the messages
export const getMessages = createAsyncThunk<{  rejectValue: ValidationErrors}>(
  'messages/getMessages',
  async (_, thunkAPI: any) => {
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
        return thunkAPI.rejectWithValue(message)
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
        return thunkAPI.rejectWithValue(message)
    }
  }
)

//? Update a message
export const replyMessage = createAsyncThunk<{  rejectValue: ValidationErrors}, messagesDataInterface>(
  'messages/replyMessage',
  async ( messageData, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.replyMessage(messageData, token);
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
        return thunkAPI.rejectWithValue(message)
    }
  }
)

//? Update a message
export const updateMessage = createAsyncThunk<{  rejectValue: ValidationErrors}, messagesDataInterface>(
  'messages/updateMessage',
  async ( messageData, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.updateMessage(messageData, token);
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
        return thunkAPI.rejectWithValue(message)
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
        return thunkAPI.rejectWithValue(message)
    }
  }
)

//? Delete a message
export const deleteMessage = createAsyncThunk<{  rejectValue: ValidationErrors}, messagesDataInterface>(
  'messages/deleteMessage',
  async ( messageData, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.deleteMessage(messageData, token);
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
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const messagesSlice = createSlice ({
  name: 'message',
  initialState,
  reducers: {
    reset: (state) => initialState, 
    setMsgId (state, action: PayloadAction<string>) {
      state.messageId = action.payload;
    }

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
        state.messageId = ''
        state.messagesArray = action.payload
      })
      .addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.messageId = ''
        state.message = action.payload
      })
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messageId = ''
        state.messagesArray.push(action.payload)
      })
      .addCase(createMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.messageId = ''
        state.message = action.payload
      })
      .addCase(replyMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(replyMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messageId = ''
        state.messagesArray.push(action.payload)
        //TODO: is this needed anymore?
        state.replyMessage = action.payload
      })
      .addCase(replyMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.messageId = ''
        state.replyMessage = null
        state.message = action.payload
      })
      .addCase(updateMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messageId = ''
        const {_id, text} = action.payload
        let index = state.messagesArray.findIndex(msg => msg._id ===_id);
        index !== -1 ?  
          state.messagesArray[index].text = text : state.isError = true
      })
      .addCase(updateMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.messageId = ''
        state.message = action.payload
      })
      .addCase(voteMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(voteMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messageId = ''
        const {_id, votes} = action.payload
        let index = state.messagesArray.findIndex(msg => msg._id ===_id);
        index !== -1 ?  
          state.messagesArray[index].votes = votes : state.isError = true
      })
      .addCase(voteMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.messageId = ''
        state.message = action.payload
      })
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.messageId = ''
        const {_id, deleted } = action.payload
        let index = state.messagesArray.findIndex(msg => msg._id ===_id);
        deleted ?  
          state.messagesArray.splice(index,1) 
          : state.isError = true
      })
      .addCase(deleteMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.messageId = ''
        state.message = action.payload
      })
  },
})

export const { reset, setMsgId } = messagesSlice.actions;
export default messagesSlice.reducer