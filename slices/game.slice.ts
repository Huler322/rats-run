import { getTotalSpending } from '@/helpers/balance-helper';
import { IStockState, IStore, IUser } from '@/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

const initialState = {
  currentUser: null,
  stock: {},
  user: {
    list: [],
    total: 1,
  },
} as IStore['game'];

export const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = initialState.currentUser;
    },
    closeCreditApartment: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const totalCapital = new Decimal(state.currentUser.currentCapital)
        .minus(new Decimal(action.payload.spending.creditApartments.full))
        .toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalCapital,
        spending: {
          ...state.currentUser.spending,
          creditApartments: {
            full: '0',
            month: '0',
          },
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
    },
    closeCreditCar: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const totalCapital = new Decimal(state.currentUser.currentCapital)
        .minus(new Decimal(action.payload.spending.creditCar.full))
        .toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalCapital,
        spending: {
          ...state.currentUser.spending,
          creditCar: {
            full: '0',
            month: '0',
          },
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
    },
    deleteUserInList: (state, action: PayloadAction<IUser>) => {
      const list = state.user.list.filter((item) => item.id !== action.payload.id);
      state.user.list = list;
      state.user.total = list.length;
    },
    minusChild: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const countChild = parseInt(state.currentUser.spending.child.count) - 1;
      const totalSpending = getTotalSpending(action.payload);
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalSpending.toString(),
        spending: {
          ...state.currentUser.spending,
          child: {
            ...state.currentUser.spending.child,
            count: countChild.toString(),
          },
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
    },
    plusChild: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const countChild = parseInt(state.currentUser.spending.child.count) + 1;
      const totalSpending = getTotalSpending(action.payload);
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalSpending.toString(),
        spending: {
          ...state.currentUser.spending,
          child: {
            ...state.currentUser.spending.child,
            count: countChild.toString(),
          },
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
    setGrandfatherValue: (state, action: PayloadAction<{ value: string; id: string }>) => {
      if (!state.currentUser) return;
      const updatedUser = {
        ...state.currentUser,
        spending: {
          ...state.currentUser.spending,
          caringGrandfather: action.payload.value,
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
    },
    setGrandmotherValue: (state, action: PayloadAction<{ value: string; id: string }>) => {
      if (!state.currentUser) return;
      const updatedUser = {
        ...state.currentUser,
        spending: {
          ...state.currentUser.spending,
          caringGrandmother: action.payload.value,
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
    },
    setStockInList: (state, action: PayloadAction<{ id: string; stock: IStockState }>) => {
      state.stock = {
        ...state.stock,
        [action.payload.id]: {
          list: [...state.stock[action.payload.id]?.list, action.payload.stock],
        },
      };
    },
    setUserInList: (state, action: PayloadAction<IUser>) => {
      const list = [...state.user.list, action.payload];
      state.user.list = list;
      state.user.total = list.length;
      state.currentUser = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  setUserInList,
  clearCurrentUser,
  deleteUserInList,
  closeCreditApartment,
  minusChild,
  closeCreditCar,
  plusChild,
  setStockInList,
  setGrandfatherValue,
  setGrandmotherValue,
} = gameSlice.actions;
