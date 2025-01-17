import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { TokenState } from '@/interfaces/tokenState.interface';

const initialState: TokenState = {
  accessToken: '',
  refreshToken: '',
};

const updateAccessAndRefreshTokenAsync = createAsyncThunk(
  'token/updateAccessAndRefreshTokenAsync',
  async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }, { dispatch }) => {
    dispatch(updateField({ key: 'accessToken', value: accessToken }));
    dispatch(updateField({ key: 'refreshToken', value: refreshToken }));
    return { accessToken, refreshToken };
  },
);

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    // Update a specific field in the token
    updateField<K extends keyof TokenState>(
      state: TokenState,
      action: PayloadAction<{ key: K; value: TokenState[K] }>,
    ): TokenState {
      state[action.payload.key] = action.payload.value;
      return state;
    },
    clearToken(state: TokenState): TokenState {
      return { ...state, accessToken: '', refreshToken: '' };
    },
  },
});

export const selectToken = (state: RootState) => state.token;
export const { updateField, clearToken } = tokenSlice.actions;
export { updateAccessAndRefreshTokenAsync };
export default tokenSlice.reducer;
