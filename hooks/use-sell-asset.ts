import { IAsset, IStockState } from '@/store/types';
import { FieldErrors, Resolver, useForm } from 'react-hook-form';

export const useSellAsset = (asset: IAsset) => {
  const resolver: Resolver<IStockState> = async (values) => {
    const errors: FieldErrors<IStockState> = {};

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
