import { IStockState } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';

export const useGetDividendsStocks = () => {
  const resolver: Resolver<IDividend> = async (values) => {
    const errors: FieldErrors<IDividend> = {};

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

  return useForm<IDividend>({
    mode: 'onSubmit',
    resolver,
  });
};

type IDividend = {
  price: string;
};
