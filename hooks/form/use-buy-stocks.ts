import { IStockState } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';
import { isPositiveInt } from '@/helpers';

export const useBuyStocks = () => {
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
