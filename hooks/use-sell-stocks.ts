import { IStockState } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import Decimal from 'decimal.js';

export const useSellStocks = (stock: IStockState) => {
  const resolver: Resolver<IStockState> = async (values) => {
    const errors: FieldErrors<IStockState> = {};

    if (!values.count?.trim()) {
      errors.count = {
        message: 'Count is required',
        type: 'required',
      };
    } else if (new Decimal(values.count ?? 0).gt(stock.count ?? 0)) {
      errors.count = {
        message: 'You can not sell more than you have',
        type: 'required',
      };
    }

    if (!values.price?.trim()) {
      errors.price = {
        message: 'Price is required',
        type: 'required',
      };
    }

    return {
      errors,
      values,
    };
  };

  return useForm<IStockState>({
    mode: 'onSubmit',
    resolver,
  });
};
