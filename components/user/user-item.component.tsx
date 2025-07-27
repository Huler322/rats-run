import { FC } from 'react';
import { View, Text } from 'react-native';
import { IUser } from '@/store/types';
import { AntDesign } from '@expo/vector-icons';

import tw from '@/lib/tailwind';

export const UserItemComponent: FC<IProps> = ({ item }) => {
  const openDeleteUserModal = () => {};

  return (
    <View
      style={tw`mt-5 bg-gray-900 rounded-2xl px-4 py-5 flex justify-between items-center flex-row border border-gray-200 `}
    >
      <View style={tw`flex flex-row items-start`}>
        <AntDesign name="user" size={24} color="white" />
        <View style={tw`ml-4`}>
          <View style={tw`flex flex-row items-center mb-1`}>
            <Text style={tw`mr-2 text-gray-100`}>Name</Text>
            <Text style={tw`text-orange-500`}>{item.name}</Text>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`mr-2 text-gray-100`}>Profession</Text>
            <Text style={tw`text-orange-500`}>{item.profession}</Text>
          </View>
        </View>
      </View>
      <AntDesign name="delete" size={36} color="red" onPress={openDeleteUserModal} />
    </View>
  );
};

interface IProps {
  item: IUser;
}
