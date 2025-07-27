import React, { FC } from 'react';

import tw from '@/lib/tailwind';
import { TextInput } from 'react-native';

export const InputComponent: FC<IProps> = ({ placeholder, style }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      style={tw`border-b-2 border-gray-300 pb-1 w-[240px] text-base text-stone-800 ${style ?? ''}`}
    />
  );
};

interface IProps {
  placeholder?: string;
  style?: string;
}
