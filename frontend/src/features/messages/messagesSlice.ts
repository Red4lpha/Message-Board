import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import messagesService from './messagesService'
import { userDataInterface } from '../../types/types'
import { AxiosError } from 'axios'

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface initialStateInterface {
  user: string | null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: string,
}

//? Get user from localStorage
const user = localStorage.getItem('user')

const initialState: initialStateInterface = {
  user: user ? JSON.parse(user) : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
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

export const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
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
        state.user = action.payload
      })
      .addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = messagesSlice.actions;
export default messagesSlice.reducer