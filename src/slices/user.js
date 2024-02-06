import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}
};

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    createUser(state, action) {
      state.user = action.payload;
    },
    updateUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
    deleteUser(state, action) {
      state.user = {}
    }
  }
});

export const { reducer } = slice;
