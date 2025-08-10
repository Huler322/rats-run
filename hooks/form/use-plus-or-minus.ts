import { FieldErrors, Resolver, useForm } from 'react-hook-form';

export interface IPlusOrMinus {
  amount: string;
}

export const usePlusOrMinus = () => {
  const resolver: Resolver<IPlusOrMinus> = async (values) => {
    const errors: FieldErrors<IPlusOrMinus> = {};

    if (!values.amount?.trim()) {
      errors.amount = {
        message: 'Field price',
        type: 'required',
      };
    }

    if (!Number.isInteger(Number(values.amount))) {
      errors.amount = {
        message: 'It is not a number',
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
