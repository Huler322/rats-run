import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { generateNonce } from '@/helpers';
import { useBuyStocks } from '@/hooks/form/use-buy-stocks';
import tw from '@/lib/tailwind';
import { setStockInList } from '@/slices/game.slice';
import { useAppDispatch } from '@/store';
import { IUser } from '@/store/types';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

export const BuyStocksFormComponents: FC<IProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useBuyStocks();

  const onBuyStocks = () => {
    const values = getValues();
    console.log('onSave values', values);
    const id = generateNonce();
    console.log('{ ...values, id }', { ...values, id });
    dispatch(setStockInList({ id: currentUser.id, stock: { ...values, id } }));
    reset();
  };

  return (
    <View style={tw`mb-8`}>
      <RowComponent>
        <View style={tw`w-[55%]`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'Stock name'}
                error={errors.name}
                withMessage={false}
                label={'Stock name'}
              />
            )}
            name="name"
            defaultValue=""
          />
        </View>
        <View style={tw`w-[20%]`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'22'}
                withMessage={false}
                error={errors.count}
                label={'Count'}
              />
            )}
            name="count"
            defaultValue=""
          />
        </View>
        <View style={tw`w-[20%]`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'15'}
                withMessage={false}
                error={errors.price}
                label={'Price'}
              />
            )}
            name="price"
            defaultValue=""
          />
        </View>
      </RowComponent>
      <ButtonComponent onPress={handleSubmit(onBuyStocks)} title={'Buy Stock'} />
    </View>
  );
};

interface IProps {
  currentUser: IUser;
}
