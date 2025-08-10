import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { IStockState } from '@/store/types';
import { Controller } from 'react-hook-form';
import { Alert, View, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { plusInCapital, sellStocks } from '@/slices/game.slice';
import Decimal from 'decimal.js';
import { useRouter } from 'expo-router';
import { useAmount } from '@/hooks/form/use-amount';

export const GetDividendsFromStock: FC<IProps> = ({ stock }) => {
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

  const onGetDividendsFromStocks = () => {
    const values = getValues();
    const sumOfDividends = new Decimal(values.amount).mul(stock.count).toString();
    Alert.alert('Are you sure want to get dividends stock?', '', [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          dispatch(plusInCapital({ user: currentUser, amount: sumOfDividends }));
          navigation.back();
        },
        text: 'Get money',
      },
    ]);
  };

  return (
    <View>
      <Text style={tw`text-center px-4 mb-1 text-base`}>Get dividends from your stocks</Text>
      <Text style={tw`text-center px-4 mb-2 text-base`}>
        Write below how much $ you get for 1 stock.
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
                placeholder={'5'}
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
        onPress={handleSubmit(onGetDividendsFromStocks)}
        styles="bg-orange-500"
      />
    </View>
  );
};

interface IProps {
  stock: IStockState;
}
