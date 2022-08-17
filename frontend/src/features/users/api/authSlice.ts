import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'
import { userDataInterface } from '../../../types/types'
import { AxiosError } from 'axios'

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface initialStateInterface {
  user: userDataInterface | null,
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  message: any,
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

//? Register user
export const register = createAsyncThunk<{  rejectValue: ValidationErrors}, userDataInterface>(
  'auth/register',
  async (user:any, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if(!error.message){
        throw err;
      }
      const message =
        (error.response &&
          error.response.data) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)

//? Login user
export const login = createAsyncThunk<{  rejectValue: ValidationErrors}, userDataInterface>(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err;
      if(!error.message){
        throw err;
      }
      const message =
        (error.response &&
          error.response.data) ||
        error.message ||
        error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      //TODO: Change the PayloadAction from any
      .addCase(register.fulfilled, (state, action: PayloadAction<any> ) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions;
export default authSlice.reducer