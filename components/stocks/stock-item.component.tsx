import { FC } from 'react';

import { SellStocksFormComponent } from '@/components/stocks/sell-stocks-form.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { IStockState } from '@/store/types';
import { Text, View } from 'react-native';

export const StockItemComponent: FC<IProps> = ({ stock }) => {
  return (
    <View
      style={tw`mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden pt-3 border-b border-gray-600`}
    >
      <RowComponent styles="w-full mb-4 text-center">
        <Text style={tw`text-base text-white font-medium w-[32%] text-center`}>
          Count - {stock.count}
        </Text>
        <Text style={tw`text-xl text-white font-medium w-[32%] text-center`}>{stock.name}</Text>
        <Text style={tw`text-base text-white font-medium w-[32%] text-center`}>
          Price - {stock.price}
        </Text>
      </RowComponent>
      <SellStocksFormComponent stock={stock} />
    </View>
  );
};

interface IProps {
  stock: IStockState;
}
