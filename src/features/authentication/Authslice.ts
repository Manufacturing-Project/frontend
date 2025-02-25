import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string;
    password: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, logout } = AuthSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default AuthSlice.reducer;
