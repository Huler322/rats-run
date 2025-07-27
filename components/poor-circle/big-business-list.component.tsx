import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const bigBusinessList = [
  { id: 1, income: 2000, price: 25000 },
  { id: 2, income: 1500, price: 15000 },
];

export const BigBusinessListComponent = () => {
  if (!bigBusinessList.length) return null;

  const onDeleteBigBusiness = (id: number) => {};

  return (
    <View>
      <Text style={tw`py-2 border-t border-b border-orange-500 mb-2 text-lg font-bold text-center`}>
        Big Businesses
      </Text>
      {bigBusinessList.map((item, key) => (
        <View key={key}>
          <RowComponent styles="mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600">
            <Text style={tw`text-base text-white font-medium w-[50%]`}>Big Bussiness</Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>$ {item.income}</Text>
            <AntDesign
              name="minuscircle"
              size={32}
              style={tw`text-red-500`}
              onPress={() => onDeleteBigBusiness(item.id)}
            />
          </RowComponent>
        </View>
      ))}
    </View>
  );
};
