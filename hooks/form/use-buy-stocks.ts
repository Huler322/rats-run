import { IStockState } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';

export const useBuyStocks = () => {
  const resolver: Resolver<IStockState> = async (values) => {
    const errors: FieldErrors<IStockState> = {};

    if (!values.name?.trim()) {
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
