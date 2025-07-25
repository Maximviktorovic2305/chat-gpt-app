import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/auth/auth.service";
import { removeFromStorage } from "@/services/auth/auth.helper";
import { errorCatch } from "@/api/api.helper";
import { IAuthResponse, IRegisterForm } from "@/types";

export const login = createAsyncThunk('user/login', async (data: { email: string, password: string }) => {
    const response = await AuthService.login(data) 
    if (!response) {
      throw new Error('Failed to login');
    }
    return response
  })         

export const register = createAsyncThunk('user/register', async (data: IRegisterForm) => {
    const response = await AuthService.register(data) 
    if (!response) {
      throw new Error('Failed to register');
    }
    return response
  });


export const logout = createAsyncThunk('auth/logout', 
    async () => {
        removeFromStorage()
    }
)   

export const checkAuth = createAsyncThunk<IAuthResponse, void, { rejectValue: unknown }>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      return response;
    } catch (error) {
      const errorMessage = errorCatch(error);

      if (errorMessage === 'jwt expired') {
        thunkApi.dispatch(logout());
      }

      return thunkApi.rejectWithValue(errorMessage || 'Authentication failed');
    }
  }
);        

export const getProfile = createAsyncThunk<IAuthResponse>('auth/me',   
    async (_, thunkApi) => {
        try {
            const response = await AuthService.getMyProfile()   
            return response
        } catch (error) {
            if(errorCatch(error) === 'jwt expired') {
                thunkApi.dispatch(logout())
            }   

            return thunkApi.rejectWithValue(error)
        }
    }
)   


