import { FC } from 'react';

import tw from '@/lib/tailwind';
import { TouchableOpacity, Text } from 'react-native';

export const ButtonComponent: FC<IProps> = ({ title }) => {
  return (
    <TouchableOpacity style={tw`px-4 py-2 rounded-md text-center bg-orange-500 `}>
      <Text style={tw`text-lg font-medium text-center`}>{title}</Text>
    </TouchableOpacity>
  );
};

interface IProps {
  title: string;
}
