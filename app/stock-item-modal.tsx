import { View, Text, Alert, TouchableOpacity } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ContainerComponent } from '@/components/templates/container.component';
import { SellStocksFormComponent } from '@/components/stocks/sell-stocks-form.component';
import { TypeNavigation } from '@/types';
import { RowComponent } from '@/components/UI/row.component';
import { GetDividendsFromStock } from '@/components/stocks/get-dividends-from-stocks-form.component';

const StockItemModal = () => {
  const { id } = useLocalSearchParams();

  const { currentUser, stock } = useAppSelector(({ game }) => game);

  if (!currentUser) return <></>;

  const currentStockList = stock[currentUser.id].list;

  const currentStock = currentStockList.find((stock) => stock.id === id);

  return (
    <ContainerComponent styles={'bg-white'}>
      <View style={tw`items-center justify-center h-full w-full`}>
        <View
          style={tw`mb-12 px-3 bg-gray-800 rounded-lg overflow-hidden pt-3 border-b border-gray-600`}
        >
          <RowComponent styles="w-full mb-4 text-center">
            <Text style={tw`text-xl text-white font-medium w-[40%] text-left`}>
              {currentStock.name}
            </Text>
            <Text style={tw`text-base text-white font-medium w-[28%] text-center`}>
              $ {currentStock.price}
            </Text>
            <Text style={tw`text-base text-white font-medium w-[28%] text-center`}>
              {currentStock.count}
            </Text>
          </RowComponent>
        </View>

        <SellStocksFormComponent stock={currentStock} />

        <GetDividendsFromStock stock={currentStock} />
      </View>
    </ContainerComponent>
  );
};

export default StockItemModal;
