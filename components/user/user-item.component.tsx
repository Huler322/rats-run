import { FC } from 'react';

import tw from '@/lib/tailwind';
import { IUser } from '@/store/types';
import { TypeNavigation } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

export const UserItemComponent: FC<IProps> = ({ item }) => {
  const navigation = useRouter();

  const openDeleteUserModal = () => {};

  const openGame = () => {
    navigation.push(`/${TypeNavigation.TABS}`);
  };

  return (
    <TouchableOpacity onPress={openGame}>
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
    </TouchableOpacity>
  );
};

interface IProps {
  item: IUser;
}
