import { createSlice } from '@reduxjs/toolkit';

import { IStore } from '@/store/types';

const initialState = {
  user: {
    list: [],
    total: 0,
  },
} as IStore['game'];

export const gameSlice = createSlice({
  extraReducers: (builder) => {
    // builder.addCase(getMyUser.fulfilled, (state, action) => {
    //   state.currentUser = new User(action.payload);
    // });
  },
  initialState,
  name: 'game',
  reducers: {},
});

export const {} = gameSlice.actions;
