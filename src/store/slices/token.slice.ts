import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { Token } from '@/interfaces/token.interface';

const initialState: Token = {
  accessToken: '',
  refreshToken: '',
};

const updateAccessAndRefreshTokenAsync = createAsyncThunk(
  'token/updateAccessAndRefreshTokenAsync',
  async (
    {
      accessToken,
      refreshToken,
    }: { accessToken: string; refreshToken: string },
    { dispatch },
  ) => {
    dispatch(setToken({ accessToken, refreshToken }));
    return { accessToken, refreshToken };
  },
);

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(
      state: Token,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ): Token {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      return state;
    },
    // Update a specific field in the token
    updateField<K extends keyof Token>(
      state: Token,
      action: PayloadAction<{ key: K; value: Token[K] }>,
    ): Token {
      state[action.payload.key] = action.payload.value;
      return state;
    },
    clearToken(state: Token): Token {
      return { ...state, accessToken: '', refreshToken: '' };
    },
  },
});

export const selectToken = (state: RootState) => state.token;
export const { setToken, updateField, clearToken } = tokenSlice.actions;
export { updateAccessAndRefreshTokenAsync };
export default tokenSlice.reducer;
