import { IBusinessState, IRichBusinessState, IStockState, IUser } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import Decimal from 'decimal.js';

export const useRichBuyBusiness = (currentUser: IUser | null) => {
  const resolver: Resolver<IRichBusinessState> = async (values) => {
    const errors: FieldErrors<IRichBusinessState> = {};

    if (!values.name?.trim()) {
      errors.name = {
        message: 'Name price',
        type: 'required',
      };
    }

    if (!values.price?.trim()) {
      errors.price = {
        message: 'Business price',
        type: 'required',
      };
    }

    if (!values.income?.trim()) {
      errors.income = {
        message: 'Income is required',
        type: 'required',
      };
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

  return useForm<IRichBusinessState>({
    mode: 'onSubmit',
    resolver,
  });
};
