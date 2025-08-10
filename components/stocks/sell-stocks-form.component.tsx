import { FC, useEffect } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { useSellStocks } from '@/hooks/use-sell-stocks';
import tw from '@/lib/tailwind';
import { IStockState } from '@/store/types';
import { Controller } from 'react-hook-form';
import { Alert, View, Text } from 'react-native';
import { useAppDispatch } from '@/store';
import { sellStocks } from '@/slices/game.slice';
import Decimal from 'decimal.js';

export const SellStocksFormComponent: FC<IProps> = ({ stock }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    // reset,
    watch,
  } = useSellStocks();

  useEffect(() => {
    setValue('price', stock.price);
    setValue('count', stock.count);
  }, [stock]);

  const onSellStocks = () => {
    const values = getValues();
    Alert.alert('Are you sure want to sell stock?', '', [
      {
        style: 'cancel',
        text: 'Keep',
      },
      {
        onPress: () =>
          dispatch(sellStocks({ id: stock.id, price: values.price, count: values.count })),
        text: 'Sell',
      },
    ]);
  };

  const { price, count } = watch();

  const totalCost = new Decimal(price?.length ? price : 0)
    .mul(new Decimal(count?.length ? count : 0))
    .toString();

  return (
    <View style={tw`mb-12`}>
      <Text style={tw`text-center px-4 mb-2 text-base`}>
        You can sell your all stocks or part of stocks
      </Text>
      <RowComponent styles="items-start">
        <View style={tw`w-[45%]`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                styles="text-center text-gray-200"
                value={value}
                onChange={onChange}
                placeholder={'250'}
                error={errors.count}
                keyboardType={'number-pad'}
              />
            )}
            name="count"
            defaultValue=""
          />
        </View>
        <View style={tw`w-[45%]`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                styles="text-center text-gray-200"
                value={value}
                onChange={onChange}
                placeholder={'120'}
                error={errors.price}
                keyboardType={'number-pad'}
              />
            )}
            name="price"
            defaultValue=""
          />
        </View>
      </RowComponent>
      <RowComponent styles={'mb-4 text-center w-full'}>
        <Text style={tw`text-center w-full`}>It will cost {totalCost}$</Text>
      </RowComponent>

      <ButtonComponent title="Sell" onPress={handleSubmit(onSellStocks)} styles="bg-orange-500" />
    </View>
  );
};

interface IProps {
  stock: IStockState;
}
