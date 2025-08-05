import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { IBusinessState } from '@/store/types';
import { TypeNavigation } from '@/types';
import { useRouter } from 'expo-router';

export const BigBusinessListComponent: FC<IProps> = ({ list }) => {
  const navigation = useRouter();
  if (!list.length) return null;

  const onDeleteBigBusiness = (id: string) => {};

  return (
    <View>
      <Text style={tw`py-2 border-t border-b border-orange-500 mb-2 text-lg font-bold text-center`}>
        Big Businesses
      </Text>
      {list.map((item, key) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(TypeNavigation.POOR_CIRCLE_BUSINESS_ITEM_MODAL)}
          key={key}
        >
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
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface IProps {
  list: IBusinessState[];
}
