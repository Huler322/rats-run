import { getTotalSpending } from '@/helpers/balance-helper';
import { IBusinessState, IStockState, IStore, IUser } from '@/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

const initialState = {
  currentUser: null,
  stock: {},
  user: {
    list: [],
    total: 1,
  },
  poorCircle: {
    smallBusiness: {},
    bigBusiness: {},
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
    setUserDivorced: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const totalCapital = new Decimal(state.currentUser.currentCapital).div(2).toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalCapital,
        isDivorced: true,
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
          list: [...state.stock[action.payload.id].list, action.payload.stock],
        },
      };
    },
    setSmallBusinessList: (
      state,
      action: PayloadAction<{ id: string; business: IBusinessState }>,
    ) => {
      if (!state.currentUser) return;
      const totalCapital = new Decimal(state.currentUser.currentCapital)
        .minus(action.payload.business.price)
        .toString();
      const updatedUser = { ...state.currentUser, currentCapital: totalCapital };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) return updatedUser;
        return item;
      });
      if (state.poorCircle.smallBusiness[action.payload.id]?.list) {
        state.poorCircle = {
          ...state.poorCircle,
          smallBusiness: {
            ...state.poorCircle.smallBusiness,
            [action.payload.id]: {
              list: [
                ...state.poorCircle.smallBusiness[action.payload.id].list,
                action.payload.business,
              ],
            },
          },
        };
        return;
      }
      state.poorCircle = {
        ...state.poorCircle,
        smallBusiness: {
          ...state.poorCircle.smallBusiness,
          [action.payload.id]: {
            list: [action.payload.business],
          },
        },
      };
    },
    setBigBusinessList: (
      state,
      action: PayloadAction<{ id: string; business: IBusinessState }>,
    ) => {
      if (!state.currentUser) return;
      const totalCapital = new Decimal(state.currentUser.currentCapital)
        .minus(action.payload.business.price)
        .toString();
      const updatedUser = { ...state.currentUser, currentCapital: totalCapital };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) return updatedUser;
        return item;
      });
      if (state.poorCircle.bigBusiness[action.payload.id]?.list) {
        state.poorCircle = {
          ...state.poorCircle,
          bigBusiness: {
            ...state.poorCircle.bigBusiness,
            [action.payload.id]: {
              list: [
                ...state.poorCircle.bigBusiness[action.payload.id].list,
                action.payload.business,
              ],
            },
          },
        };
        return;
      }
      state.poorCircle = {
        ...state.poorCircle,
        bigBusiness: {
          ...state.poorCircle.bigBusiness,
          [action.payload.id]: {
            list: [action.payload.business],
          },
        },
      };
    },
    setUserInList: (state, action: PayloadAction<IUser>) => {
      const list = [...state.user.list, action.payload];
      state.user.list = list;
      state.user.total = list.length;
      state.currentUser = action.payload;
    },
    sellStocks: (state, action: PayloadAction<{ id: string; price: string; count: string }>) => {
      if (!state.currentUser) return;
      const stockList = state.stock[state.currentUser.id]?.list;
      const currentStock = stockList.find((item) => item.id === action.payload.id);
      if (!currentStock) return;
      const earned = new Decimal(action.payload.count).mul(new Decimal(action.payload.price));
      const currentCapital = new Decimal(state.currentUser.currentCapital).plus(earned).toString();
      const currentUser = {
        ...state.currentUser,
        currentCapital: currentCapital,
      };
      state.currentUser = currentUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === currentUser.id) {
          return currentUser;
        }
        return item;
      });
      if (new Decimal(currentStock.count).eq(new Decimal(action.payload.count))) {
        state.stock = {
          ...state.stock,
          [state.currentUser.id]: {
            list: stockList.filter((item) => item.id !== action.payload.id),
          },
        };
        return;
      }
      const stockCount = new Decimal(currentStock.count)
        .minus(new Decimal(action.payload.count))
        .toString();
      state.stock = {
        ...state.stock,
        [state.currentUser.id]: {
          list: stockList.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, count: stockCount };
            }
            return item;
          }),
        },
      };
    },
  },
});

export const {
  setCurrentUser,
  setUserInList,
  clearCurrentUser,
  deleteUserInList,
  sellStocks,
  closeCreditApartment,
  minusChild,
  closeCreditCar,
  plusChild,
  setStockInList,
  setGrandfatherValue,
  setGrandmotherValue,
  setUserDivorced,
  setSmallBusinessList,
  setBigBusinessList,
} = gameSlice.actions;
