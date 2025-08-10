import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import { isPositiveInt } from '@/helpers';

export interface IPlusOrMinus {
  amount: string;
}

export const useAmount = () => {
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
