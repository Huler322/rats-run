import tw from '@/lib/tailwind';
import { TypeNavigation } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View, Text } from 'react-native';

export const CreateUserItem = () => {
  const navigation = useRouter();

  const createUser = () => {
    // @ts-ignore
    navigation.push(TypeNavigation.CREATE_OR_EDIT_USER);
  };

  return (
    <TouchableOpacity onPress={createUser}>
      <View
        style={tw`bg-gray-900 rounded-2xl px-4 py-5 flex justify-center items-center flex-row border border-gray-200 `}
      >
        <AntDesign name="user" size={24} color="orange" />
        <Text style={tw`text-orange-500 ml-2`}>Add New User</Text>
      </View>
    </TouchableOpacity>
  );
};
