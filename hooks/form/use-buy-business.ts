import { IBusinessState, IStockState, IUser } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import Decimal from 'decimal.js';
import { isPositiveInt } from '@/helpers';

export const useBuyBusiness = (currentUser: IUser | null) => {
  const resolver: Resolver<IBusinessState> = async (values) => {
    const errors: FieldErrors<IBusinessState> = {};
    const incomeStr = values.income?.trim();
    const priceStr = values.price?.trim();

    if (!priceStr) {
      errors.price = {
        message: 'Business price',
        type: 'required',
      };
    } else if (!isPositiveInt(priceStr)) {
      errors.price = { message: 'Price must be an integer', type: 'validate' };
    }

    if (!incomeStr) {
      errors.income = {
        message: 'Income is required',
        type: 'required',
      };
    } else if (!isPositiveInt(incomeStr)) {
      errors.income = { message: 'Income must be an integer', type: 'validate' };
    }

    if (new Decimal(values.price).gt(currentUser?.currentCapital ?? '0')) {
      errors.price = {
        message: 'Not enough money',
        type: 'validate',
      };
    }

    return {
      errors,
      values,
    };
  };

  return useForm<IBusinessState>({
    mode: 'onSubmit',
    resolver,
  });
};
