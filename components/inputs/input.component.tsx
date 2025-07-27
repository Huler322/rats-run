import React, { FC } from 'react';

import tw from '@/lib/tailwind';
import { TextInput, TextInputProps } from 'react-native';

export const InputComponent: FC<IProps> = ({ placeholder, style, ...rest }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      style={[tw`border-b border-gray-300 pb-2 mb-4 text-base text-gray-800`, style]}
      {...rest}
    />
  );
};

interface IProps extends TextInputProps {
  placeholder?: string;
}
