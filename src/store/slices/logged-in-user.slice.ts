import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { LoggedInUser } from '@/interfaces/logged-in-user.interface';

const initialState: LoggedInUser = {
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
  id: 0,
  username: '',
};

const updateUserFieldAsync = createAsyncThunk(
  'loggedInUser/updateFieldAsync',
  async (
    { key, value }: { key: keyof LoggedInUser; value: LoggedInUser[keyof LoggedInUser] },
    { dispatch },
  ) => {
    dispatch(updateField({ key, value }));
    return { key, value }; // Return payload for further chaining
  },
);

const loggedInUserSlice = createSlice({
  name: 'loggedInUser',
  initialState,
  reducers: {
    setLoggedInUser(state, action: PayloadAction<LoggedInUser>): LoggedInUser {
      return { ...state, ...action.payload };
    },
    clearLoggedInUser(): LoggedInUser {
      return initialState;
    },
    // Update a specific field in the object
    updateField<K extends keyof LoggedInUser>(
      state: LoggedInUser,
      action: PayloadAction<{ key: K; value: LoggedInUser[K] }>,
    ): LoggedInUser {
      state[action.payload.key] = action.payload.value;
      return state;
    },
  },
});

export const selectLoggedInUser = (state: RootState) => state.loggedInUser;
export const { setLoggedInUser, clearLoggedInUser, updateField } = loggedInUserSlice.actions;
export { updateUserFieldAsync };
export default loggedInUserSlice.reducer;
