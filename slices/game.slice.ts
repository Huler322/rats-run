import { IStore, IUser } from '@/store/types';
import { UserStatus } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  user: {
    list: [
      // {
      //   dream: {
      //     name: 'But Lambo',
      //     price: '1000000',
      //   },
      //   id: '1',
      //   name: 'Test',
      //   profession: 'profession',
      //   salary: { salary: '100' },
      //   spending: {
      //     apartments: '200',
      //     child: '70',
      //     clothes: '50',
      //     creditApartments: {
      //       full: '20000',
      //       month: '200',
      //     },
      //     creditCar: {
      //       full: '20000',
      //       month: '200',
      //     },
      //     education: '100',
      //
      //     food: '300',
      //     internet: '0',
      //     travel: '10',
      //   },
      //   startingCapital: '550',
      //   status: UserStatus.created,
      // },
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
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = initialState.currentUser;
    },
    deleteUserInList: (state, action: PayloadAction<IUser>) => {
      const list = state.user.list.filter((item) => item.id !== action.payload.id);
      state.user.list = list;
      state.user.total = list.length;
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    setUserInList: (state, action: PayloadAction<IUser>) => {
      const list = [...state.user.list, action.payload];
      state.user.list = list;
      state.user.total = list.length;
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser, setUserInList, clearCurrentUser, deleteUserInList } =
  gameSlice.actions;
