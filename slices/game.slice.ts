import { getTotalSpending } from '@/helpers/balance-helper';
import { IBusinessState, IRichBusinessState, IStockState, IStore, IUser } from '@/store/types';
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
  richCircle: {
    business: {},
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
    getSalary: (state) => {
      if (!state.currentUser) return;
      const apartmentsCost = new Decimal(
        state.currentUser?.spending?.apartments?.length
          ? state.currentUser?.spending?.apartments
          : 0,
      );
      const foodCost = new Decimal(
        state.currentUser?.spending?.food?.length ? state.currentUser?.spending?.food : 0,
      );
      const educationCost = new Decimal(
        state.currentUser?.spending?.education?.length ? state.currentUser?.spending?.education : 0,
      );
      const clothesCost = new Decimal(
        state.currentUser?.spending?.clothes?.length ? state.currentUser?.spending?.clothes : 0,
      );
      const internetCost = new Decimal(
        state.currentUser?.spending?.internet?.length ? state.currentUser?.spending?.internet : 0,
      );
      const travelCost = new Decimal(
        state.currentUser?.spending?.travel?.length ? state.currentUser?.spending?.travel : 0,
      );
      const childCost = new Decimal(
        state.currentUser?.spending?.child?.cost?.length
          ? state.currentUser?.spending?.child?.cost
          : 0,
      ).mul(
        new Decimal(
          state.currentUser?.spending?.child?.count?.length
            ? state.currentUser?.spending?.child?.count
            : 0,
        ),
      );
      const creditApartmentsCost = new Decimal(
        state.currentUser?.spending?.creditApartments?.month?.length
          ? state.currentUser?.spending?.creditApartments?.month
          : 0,
      );
      const creditCarCost = new Decimal(
        state.currentUser?.spending?.creditCar?.month?.length
          ? state.currentUser?.spending?.creditCar?.month
          : 0,
      );
      const caringGrandfatherCost = new Decimal(
        state.currentUser?.spending?.caringGrandfather?.length
          ? state.currentUser?.spending?.caringGrandfather
          : 0,
      );
      const caringGrandmotherCost = new Decimal(
        state.currentUser?.spending?.caringGrandmother?.length
          ? state.currentUser?.spending?.caringGrandmother
          : 0,
      );
      const totalMinus = Decimal.sum(
        apartmentsCost,
        foodCost,
        educationCost,
        clothesCost,
        internetCost,
        travelCost,
        childCost,
        creditApartmentsCost,
        creditCarCost,
        caringGrandfatherCost,
        caringGrandmotherCost,
      );

      const salaryCost = new Decimal(
        state.currentUser?.salary?.salary?.length ? state.currentUser?.salary?.salary : 0,
      );
      const passiveBusinessSalaryCost = new Decimal(
        state.currentUser?.salary?.passiveBusinessSalary?.length
          ? state.currentUser?.salary?.passiveBusinessSalary
          : 0,
      );
      const passiveImmovableSalaryCost = new Decimal(
        state.currentUser?.salary?.passiveImmovableSalary?.length
          ? state.currentUser?.salary?.passiveImmovableSalary
          : 0,
      );
      const totalSalary = Decimal.sum(
        salaryCost,
        passiveBusinessSalaryCost,
        passiveImmovableSalaryCost,
      );
      const smallBusinessList = state.poorCircle.smallBusiness[state.currentUser.id]?.list;
      const smallBusinessCost = smallBusinessList?.length
        ? Decimal.sum(...smallBusinessList.map((item) => new Decimal(item.income)))
        : new Decimal(0);
      const bigBusinessList = state.poorCircle.bigBusiness[state.currentUser.id]?.list;
      const bigBusinessCost = bigBusinessList?.length
        ? Decimal.sum(...bigBusinessList.map((item) => new Decimal(item.income)))
        : new Decimal(0);
      const businessList = state.richCircle.business[state.currentUser.id]?.list;
      const businessCost = businessList?.length
        ? Decimal.sum(...businessList.map((item) => new Decimal(item.income)))
        : new Decimal(0);
      const currentCapital = new Decimal(state.currentUser.currentCapital);
      const totalCapital = Decimal.sum(
        currentCapital,
        totalSalary,
        smallBusinessCost,
        bigBusinessCost,
        businessCost,
      )
        .minus(totalMinus)
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
  getSalary,
} = gameSlice.actions;
