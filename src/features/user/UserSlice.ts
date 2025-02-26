import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { UserResponse } from './UserModel';

interface UserState {
  isAuthenticated: boolean;
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
}


const initialState: UserState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
};



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth:  (state, action: PayloadAction<UserResponse>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    },
    
    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, logout, setUser, clearUser, setError, setLoading } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
