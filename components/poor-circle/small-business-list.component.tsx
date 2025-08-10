import { View, Text, TouchableOpacity } from 'react-native';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { FC } from 'react';
import { IBusinessState } from '@/store/types';
import { useRouter } from 'expo-router';
import { TypeNavigation } from '@/types';

export const SmallBusinessListComponent: FC<IProps> = ({ list }) => {
  const navigation = useRouter();

  if (!list.length) return <></>;

  return (
    <View>
      <Text style={tw`py-2 border-t border-b border-orange-500 mb-2 text-lg font-bold text-center`}>
        Small Businesses
      </Text>
      {list.map((item, key) => (
        <TouchableOpacity
          onPress={() =>
            navigation.push({
              pathname: TypeNavigation.POOR_CIRCLE_SMALL_BUSINESS_ITEM_MODAL,
              params: { id: item.id },
            })
          }
          key={key}
          style={tw`mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600`}
        >
          <RowComponent>
            <Text style={tw`text-base text-white font-medium w-[50%]`}>Small Bussiness</Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>$ {item.income}</Text>
          </RowComponent>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface IProps {
  list: IBusinessState[];
}
