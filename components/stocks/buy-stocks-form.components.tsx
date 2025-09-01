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
import { View, Text } from 'react-native';
import Decimal from 'decimal.js';

export const BuyStocksFormComponents: FC<IProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    watch,
  } = useBuyStocks(currentUser);

  const { price, count } = watch();

  const totalCost = new Decimal(price?.length ? price : 0).mul(
    new Decimal(count?.length ? count : 0),
  );

  const formattedTotal = totalCost.toString();

  const onBuyStocks = () => {
    const values = getValues();
    const id = generateNonce();
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
                withMessage={true}
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
                placeholder={'15'}
                withMessage={false}
                error={errors.price}
                label={'Price'}
                keyboardType={'number-pad'}
              />
            )}
            name="price"
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
                keyboardType={'number-pad'}
              />
            )}
            name="count"
            defaultValue=""
          />
        </View>
      </RowComponent>

      <RowComponent styles={'mb-4 text-center w-full'}>
        <Text style={tw`text-center w-full`}>It will cost {formattedTotal}$</Text>
      </RowComponent>

      <ButtonComponent onPress={handleSubmit(onBuyStocks)} title={'Buy Stock'} />
    </View>
  );
};

interface IProps {
  currentUser: IUser;
}
