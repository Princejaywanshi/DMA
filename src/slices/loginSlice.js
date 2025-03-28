import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '../utils/authStorage';
import { getUserDetailsAPIAction } from '../actions/userLoginApi';
import AuthStorage from '../utils/authStorage';

const initialState = {
  userInfo: {},
  authToken: null,
  status: 'idle',
};

export const getUserbyId = createAsyncThunk(
  'user/getUserInfo',
  async (id) => {
    const response = await getUserDetailsAPIAction(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
    //   state.userInfo = action.payload.LoginProcess[0];
      state.authToken = action.payload.authtoken;
    },
    logout: (state) => {
      AuthStorage.removeTokens();
    //   AsyncStorage.removeValue('@baseUrl');
    //   state.userInfo = {};
      state.authToken = null;
    },
    updateUser: (state, action) => {
    //   state.userInfo = action.payload;
    },
    getDatafromAsync: (state, action) => {
    //   state.userInfo = action.payload.user;
      state.authToken = action.payload.authtoken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserbyId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserbyId.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(getUserbyId.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { login, logout, getDatafromAsync, updateUser } = userSlice.actions;
export const selectUserInfo = (state) => state.user;
// export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
