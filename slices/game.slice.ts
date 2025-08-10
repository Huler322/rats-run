import { getTotalSalary, getTotalSpending } from '@/helpers/balance-helper';
import { IBusinessState, IRichBusinessState, IStockState, IStore, IUser } from '@/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';
import { UserStatus } from '@/types';

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
  richCircle: {
    business: {},
  },
} as IStore['game'];

export const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    setStatusOfGame: (state, action: PayloadAction<{ status: UserStatus; user: IUser }>) => {
      const updatedUser = { ...action.payload.user, status: action.payload.status };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.user.id) {
          return updatedUser;
        }
        return item;
      });
    },
    clearCurrentUser: (state) => {
      state.currentUser = initialState.currentUser;
    },
    quitFromJob: (state) => {
      if (!state.currentUser) return;
      const updatedUser = {
        ...state.currentUser,
        profession: '',
        salary: {
          ...state.currentUser.salary,
          salary: '0',
        },
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === updatedUser.id) {
          return updatedUser;
        }
        return item;
      });
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
    plusInCapital: (state, action: PayloadAction<{ amount: string; user: IUser }>) => {
      const currentCapital = new Decimal(action.payload.user.currentCapital)
        .plus(action.payload.amount)
        .toString();
      const updatedUser = {
        ...action.payload.user,
        currentCapital,
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.user.id) {
          return updatedUser;
        }
        return item;
      });
    },
    minusInCapital: (state, action: PayloadAction<{ amount: string; user: IUser }>) => {
      const currentCapital = new Decimal(action.payload.user.currentCapital)
        .minus(action.payload.amount)
        .toString();
      const updatedUser = {
        ...action.payload.user,
        currentCapital,
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.user.id) {
          return updatedUser;
        }
        return item;
      });
    },
    minusChild: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const countChild = parseInt(state.currentUser.spending.child.count) - 1;
      const currentCapital = new Decimal(state.currentUser.currentCapital).minus(1000).toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital,
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
      const currentCapital = new Decimal(state.currentUser.currentCapital).plus(1000).toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital,
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
    minusTax: (state, action: PayloadAction<IUser>) => {
      if (!state.currentUser) return;
      const currentCapital = new Decimal(state.currentUser.currentCapital);
      const totalCapital = currentCapital.minus(currentCapital.mul(0.1)).floor().toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalCapital,
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
      if (!state.currentUser) return;
      const totalStockCost = new Decimal(action.payload.stock.count).mul(
        action.payload.stock.price,
      );
      const totalCapital = new Decimal(state.currentUser.currentCapital)
        .minus(totalStockCost)
        .toString();
      const updatedUser = {
        ...state.currentUser,
        currentCapital: totalCapital,
      };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return updatedUser;
        }
        return item;
      });
      if (state.stock[action.payload.id]?.list?.length) {
        state.stock = {
          ...state.stock,
          [action.payload.id]: {
            list: [...state.stock[action.payload.id].list, action.payload.stock],
          },
        };
        return;
      }
      state.stock = {
        ...state.stock,
        [action.payload.id]: {
          list: [action.payload.stock],
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
    updateSmallBusinessList: (
      state,
      action: PayloadAction<{ id: string; business: IBusinessState }>,
    ) => {
      if (!state.currentUser) return;
      const updatedBusinessList = state.poorCircle.smallBusiness[action.payload.id].list.map(
        (item) => {
          if (action.payload.business.id === item.id) {
            return action.payload.business;
          }
          return item;
        },
      );
      state.poorCircle = {
        ...state.poorCircle,
        smallBusiness: {
          ...state.poorCircle.smallBusiness,
          [action.payload.id]: {
            list: updatedBusinessList,
          },
        },
      };
    },
    deleteSmallBusinessInList: (
      state,
      action: PayloadAction<{ id: string; business: IBusinessState }>,
    ) => {
      if (!state.currentUser) return;
      const updatedList = state.poorCircle.smallBusiness[action.payload.id].list.filter(
        (item) => item.id !== action.payload.business.id,
      );
      state.poorCircle = {
        ...state.poorCircle,
        smallBusiness: {
          ...state.poorCircle.smallBusiness,
          [action.payload.id]: {
            list: updatedList,
          },
        },
      };
    },
    deleteBigBusinessInList: (
      state,
      action: PayloadAction<{ id: string; business: IBusinessState }>,
    ) => {
      if (!state.currentUser) return;
      const updatedList = state.poorCircle.bigBusiness[action.payload.id].list.filter(
        (item) => item.id !== action.payload.business.id,
      );
      state.poorCircle = {
        ...state.poorCircle,
        bigBusiness: {
          ...state.poorCircle.bigBusiness,
          [action.payload.id]: {
            list: updatedList,
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
    setRichBusinessList: (
      state,
      action: PayloadAction<{ id: string; business: IRichBusinessState }>,
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
      if (state.richCircle.business[action.payload.id]?.list) {
        state.richCircle = {
          business: {
            ...state.richCircle.business,
            [action.payload.id]: {
              list: [...state.richCircle.business[action.payload.id].list, action.payload.business],
            },
          },
        };
        return;
      }
      state.richCircle = {
        business: {
          ...state.richCircle.business,
          [action.payload.id]: {
            list: [action.payload.business],
          },
        },
      };
    },
    deleteRichBusinessInList: (
      state,
      action: PayloadAction<{ id: string; business: IRichBusinessState }>,
    ) => {
      if (!state.currentUser) return;
      const updatedList = state.richCircle.business[action.payload.id].list.filter(
        (item) => item.id !== action.payload.business.id,
      );
      state.richCircle = {
        business: {
          ...state.richCircle.business,
          [action.payload.id]: {
            list: updatedList,
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
    updateUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user.list = state.user.list.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      state.currentUser = action.payload;
    },
    getSalary: (state) => {
      if (!state.currentUser) return;
      const totalMinus = getTotalSpending(state.currentUser);
      const totalSalary = getTotalSalary(state.currentUser, state.poorCircle, state.richCircle);
      const totalCapital = Decimal.sum(state.currentUser.currentCapital, new Decimal(totalSalary))
        .minus(new Decimal(totalMinus))
        .toString();
      const updatedUser = { ...state.currentUser, currentCapital: totalCapital };
      state.currentUser = updatedUser;
      state.user.list = state.user.list.map((item) => {
        if (updatedUser.id === item.id) {
          return updatedUser;
        }
        return item;
      });
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
  deleteSmallBusinessInList,
  deleteBigBusinessInList,
  setRichBusinessList,
  deleteRichBusinessInList,
  updateSmallBusinessList,
  minusInCapital,
  plusInCapital,
  getSalary,
  minusTax,
  updateUserInfo,
  quitFromJob,
  setStatusOfGame,
} = gameSlice.actions;
