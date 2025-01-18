import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { UserState } from '@/interfaces/userState.interface';

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
  id: 0,
  username: '',
};

const updateUserFieldAsync = createAsyncThunk(
  'user/updateFieldAsync',
  async (
    { key, value }: { key: keyof UserState; value: UserState[keyof UserState] },
    { dispatch },
  ) => {
    dispatch(updateField({ key, value }));
    return { key, value }; // Return payload for further chaining
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Update the entire user state
    setUser(state, action: PayloadAction<UserState>): UserState {
      return { ...state, ...action.payload };
    },
    // Reset the user to its initial state
    clearUser(): UserState {
      return initialState;
    },
    // Update a specific field in the user
    updateField<K extends keyof UserState>(
      state: UserState,
      action: PayloadAction<{ key: K; value: UserState[K] }>,
    ): UserState {
      state[action.payload.key] = action.payload.value;
      return state;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const { setUser, clearUser, updateField } = userSlice.actions;
export { updateUserFieldAsync };
export default userSlice.reducer;
