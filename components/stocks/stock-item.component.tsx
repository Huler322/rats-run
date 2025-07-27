import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { SellStocksFormComponent } from '@/components/stocks/sell-stocks-form.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

export const StockItemComponent: FC<IProps> = ({ stock }) => {
  return (
    <View
      style={tw`mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden pt-3 border-b border-gray-600`}
    >
      <RowComponent styles="mb-1">
        <Text style={tw`text-base text-white font-medium w-[50%]`}>{stock.name}</Text>
        <Text style={tw`text-base text-orange-500 font-medium text-center w-[22%]`}>
          {stock.count}
        </Text>
        <Text style={tw`text-base text-orange-500 font-medium text-center w-[22%]`}>
          {stock.price}
        </Text>
      </RowComponent>
      <SellStocksFormComponent />
    </View>
  );
};

interface IProps {
  stock: { name: string; count: string; price: string };
}
