import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { Text } from 'react-native';

export const StockItemsHeaderComponent = () => {
  return (
    <RowComponent styles={'px-3 py-3 border-b border-gray-600 mb-4'}>
      <Text style={tw`text-base text-gray-900 font-medium w-[50%]`}>Stock name</Text>
      <Text style={tw`text-base text-orange-500 font-medium text-center w-[22%]`}>Count</Text>
      <Text style={tw`text-base text-orange-500 font-medium text-center w-[22%]`}>Price</Text>
    </RowComponent>
  );
};
