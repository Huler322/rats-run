import { View, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { IAsset } from '@/store/types';
import tw from '@/lib/tailwind';
import { RowComponent } from '@/components/UI/row.component';
import { TypeNavigation } from '@/types';
import { useRouter } from 'expo-router';

export const AssetItem: FC<IProps> = ({ item }) => {
  const navigation = useRouter();

  return (
    <TouchableOpacity
      style={tw`mt-5 p-6 rounded-md bg-gray-200`}
      onPress={() =>
        navigation.push({
          pathname: TypeNavigation.ASSET_ITEM_MODAL,
          params: { id: item.id },
        })
      }
    >
      <RowComponent>
        <Text style={tw`text-lg font-medium text-blue-700 mb-2`}>Type</Text>
        <Text style={tw`text-lg font-medium text-blue-700 mb-2`}>Price</Text>
      </RowComponent>
      <RowComponent>
        <Text style={tw`text-lg font-medium mb-1`}>{item.type}</Text>
        <Text style={tw`text-lg text-orange-500 font-bold mb-1`}>$ {item.price}</Text>
      </RowComponent>
      <RowComponent>
        {item.name ? (
          <Text style={tw`text-lg font-medium`}>{item.name}</Text>
        ) : (
          <Text style={tw`text-lg font-medium`}>Count</Text>
        )}
        <View style={tw`flex flex-row items-center`}>
          {item.name ? <Text style={tw`text-lg font-bold`}>Count - </Text> : null}
          <Text style={tw`text-lg text-orange-500 font-bold`}>{item.count}</Text>
        </View>
      </RowComponent>
    </TouchableOpacity>
  );
};

interface IProps {
  item: IAsset;
}
