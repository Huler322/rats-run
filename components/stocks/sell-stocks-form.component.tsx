import { FC, useEffect } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { useSellStocks } from '@/hooks/use-sell-stocks';
import tw from '@/lib/tailwind';
import { IStockState } from '@/store/types';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useAppDispatch } from '@/store';
import { sellStocks } from '@/slices/game.slice';

export const SellStocksFormComponent: FC<IProps> = ({ stock }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    // reset,
  } = useSellStocks();

  useEffect(() => {
    setValue('price', stock.price);
    setValue('count', stock.count);
  }, [stock]);

  const onSellStocks = () => {
    const values = getValues();
    dispatch(sellStocks({ id: stock.id, price: values.price, count: values.count }));
  };

  return (
    <View style={tw`pb-4`}>
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
              />
            )}
            name="price"
            defaultValue=""
          />
        </View>
      </RowComponent>
      <ButtonComponent title="Sell" onPress={handleSubmit(onSellStocks)} styles="bg-orange-500" />
    </View>
  );
};

interface IProps {
  stock: IStockState;
}
