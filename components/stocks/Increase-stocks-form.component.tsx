import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { IStockState } from '@/store/types';
import { Controller } from 'react-hook-form';
import { Alert, View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { increaseStock } from '@/slices/game.slice';
import Decimal from 'decimal.js';
import { useRouter } from 'expo-router';
import { useAmount } from '@/hooks/form/use-amount';

export const IncreaseStocksFormComponent: FC<IProps> = ({ stock }) => {
  const dispatch = useAppDispatch();
  const navigation = useRouter();

  const { currentUser } = useAppSelector(({ game }) => game);

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useAmount();

  if (!currentUser) return <></>;

  const onIncreaseStocks = () => {
    const values = getValues();
    const stockCount = new Decimal(stock.count).mul(values.amount).toString();
    const updatedStock = { ...stock, count: stockCount };
    Alert.alert('Are you sure want to increase stock?', '', [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          dispatch(increaseStock({ user: currentUser, stock: updatedStock }));
          navigation.back();
        },
        text: 'Increase',
      },
    ]);
  };

  return (
    <View style={tw`mt-6`}>
      <Text style={tw`text-center px-4 mb-1 text-base`}>
        By how much should we increase the number of stocks?
      </Text>
      <RowComponent styles="items-start">
        <View style={tw`w-full`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                styles="text-center text-gray-200"
                value={value}
                onChange={onChange}
                placeholder={'2'}
                error={errors.amount}
                keyboardType={'number-pad'}
              />
            )}
            name="amount"
            defaultValue=""
          />
        </View>
      </RowComponent>
      <ButtonComponent
        title="Get Dividends"
        onPress={handleSubmit(onIncreaseStocks)}
        styles="bg-orange-500"
      />
    </View>
  );
};

interface IProps {
  stock: IStockState;
}
