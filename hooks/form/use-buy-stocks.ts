import { IStockState, IUser } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import { isPositiveInt } from '@/helpers';
import Decimal from 'decimal.js';

export const useBuyStocks = (currentUser: IUser) => {
  const resolver: Resolver<IStockState> = async (values) => {
    const errors: FieldErrors<IStockState> = {};
    const name = values.name?.trim();
    const countStr = values.count?.trim();
    const priceStr = values.price?.trim();

    if (!name) {
      errors.name = {
        message: 'Name is required',
        type: 'required',
      };
    }

    if (!values.count?.trim()) {
      errors.count = {
        message: 'Count is required',
        type: 'required',
      };
    } else if (!isPositiveInt(countStr)) {
      errors.count = { message: 'Count must be an integer', type: 'validate' };
    }

    if (!values.price?.trim()) {
      errors.price = {
        message: 'Price is required',
        type: 'required',
      };
    } else if (!isPositiveInt(priceStr)) {
      errors.price = { message: 'Price must be an integer', type: 'validate' };
    }

    const totalCost = new Decimal(values.price?.length ? values.price : 0).mul(
      new Decimal(values.count?.length ? values.count : 0),
    );

    if (totalCost.gt(new Decimal(currentUser?.currentCapital ? currentUser?.currentCapital : 0))) {
      errors.name = {
        message: 'Not enough money',
        type: 'validate',
      };
      errors.price = {
        message: 'Not enough money',
        type: 'validate',
      };
      errors.count = {
        message: 'Not enough money',
        type: 'validate',
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
