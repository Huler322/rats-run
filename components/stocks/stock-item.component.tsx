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
      <RowComponent styles="mb-1 text-center w-full">
        <Text style={tw`text-2xl text-white font-medium text-center w-full mb-4`}>
          {stock.name}
        </Text>
      </RowComponent>
      <SellStocksFormComponent stock={stock} />
    </View>
  );
};

interface IProps {
  stock: IStockState;
}
