import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from './UserModel';

interface UserState {
  user: UserResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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

export const { setUser, clearUser, setError, setLoading } = userSlice.actions;

export default userSlice.reducer;
