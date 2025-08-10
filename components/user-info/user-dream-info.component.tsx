import { FC } from 'react';

import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { IUser } from '@/store/types';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const UserDreamInfoComponent: FC<IProps> = ({ currentUser }) => {
  return (
    <>
      <View style={tw`bg-gray-800 rounded-lg overflow-hidden mb-20`}>
        <RowComponent styles={'bg-gray-700 px-4 py-2 border-b border-gray-600'}>
          <Text style={tw`text-center text-lg font-medium text-white`}>{currentUser.name}</Text>
        </RowComponent>

        <RowComponent styles="px-4 py-5 border-b border-gray-600">
          <RowComponent>
            <FontAwesome5 name="flag" size={18} style={tw`text-gray-300 mr-2`} />
            <Text style={tw`text-base text-gray-300`}>Dream price</Text>
          </RowComponent>
          <RowComponent>
            <Text style={tw`text-base text-orange-400 font-semibold`}>
              {currentUser.dream.name}
            </Text>
          </RowComponent>
        </RowComponent>

        <RowComponent styles="px-4 py-5 border-b border-gray-600">
          <RowComponent>
            <FontAwesome5 name="dollar-sign" size={16} style={tw`text-gray-300 mr-2`} />
            <Text style={tw`text-base text-gray-300`}>Dream price</Text>
          </RowComponent>
          <RowComponent>
            <Text style={tw`text-base text-orange-400 font-semibold`}>
              {currentUser.dream.price}
            </Text>
          </RowComponent>
        </RowComponent>

        <RowComponent styles="px-4 py-5">
          <View style={tw`flex-row items-center`}>
            <FontAwesome5 name="briefcase" size={16} style={tw`text-gray-300 mr-2`} />
            <Text style={tw`text-base text-gray-300`}>Profession</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>{currentUser.profession}</Text>
        </RowComponent>
      </View>
    </>
  );
};

interface IProps {
  currentUser: IUser;
}
