import { createSlice } from '@reduxjs/toolkit';

import { IStore } from '@/store/types';
import { UserStatus } from '@/types';

const initialState = {
  user: {
    list: [
      {
        id: '1',
        name: 'Test',
        status: UserStatus.created,
        profession: 'profession',
        salary: { salary: '100' },
        dream: {
          name: 'But Lambo',
          price: '1000000',
        },
        spending: {
          apartments: '200',
          food: '300',
          education: '100',
          clothes: '50',
          internet: '0',
          travel: '10',
          child: '70',
          creditApartments: {
            full: '20000',
            month: '200',
          },
          creditCar: {
            full: '20000',
            month: '200',
          },
        },
        startingCapital: '550',
      },
    ],
    total: 1,
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
