import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import { isPositiveInt } from '@/helpers';
import { IUser } from '@/store/types';
import Decimal from 'decimal.js';

export interface IPlusOrMinus {
  amount: string;
  name: string;
}

export const useBuyAsset = (currentUser: IUser | null) => {
  const resolver: Resolver<IPlusOrMinus> = async (values) => {
    const errors: FieldErrors<IPlusOrMinus> = {};
    const amountStr = values.amount?.trim();

    if (!amountStr) {
      errors.amount = {
        message: 'Field required',
        type: 'required',
      };
    } else if (!isPositiveInt(amountStr)) {
      errors.amount = { message: 'Amount must be an integer', type: 'validate' };
    }

    const totalCost = new Decimal(values.amount?.length ? values.amount : 0);

    if (totalCost.gt(new Decimal(currentUser?.currentCapital ? currentUser?.currentCapital : 0))) {
      errors.amount = {
        message: 'Not enough money',
        type: 'validate',
      };
    }

    return {
      errors,
      values,
    };
  };

  return useForm<IPlusOrMinus>({
    mode: 'onSubmit',
    resolver,
  });
};
