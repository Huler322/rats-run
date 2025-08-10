import { FC } from 'react';

import { SellStocksFormComponent } from '@/components/stocks/sell-stocks-form.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { IStockState } from '@/store/types';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { TypeNavigation } from '@/types';

export const StockItemComponent: FC<IProps> = ({ stock }) => {
  const navigation = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push({
          pathname: TypeNavigation.STOCK_ITEM_MODAL,
          params: { id: stock.id },
        })
      }
      style={tw`mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden pt-3 border-b border-gray-600`}
    >
      <RowComponent styles="w-full mb-4 text-center">
        <Text style={tw`text-xl text-white font-medium w-[40%] text-left`}>{stock.name}</Text>
        <Text style={tw`text-base text-white font-medium w-[28%] text-center`}>
          $ {stock.price}
        </Text>
        <Text style={tw`text-base text-white font-medium w-[28%] text-center`}>{stock.count}</Text>
      </RowComponent>
    </TouchableOpacity>
  );
};

interface IProps {
  stock: IStockState;
}
