import React, { FC } from 'react';

import { useInputStyles } from '@/hooks/use-input-styles';
import tw from '@/lib/tailwind';
import { FieldError } from 'react-hook-form';
import { TextInput, Text, View } from 'react-native';

export const InputComponent: FC<IProps> = ({
  value,
  placeholder,
  onChange,
  label,
  error,
  keyboardType,
  styles,
  stylesLabel,
}) => {
  const { focusStyle, onBlur, onFocus } = useInputStyles(error);

  return (
    <View style={tw`pb-6 relative`}>
      {label ? (
        <Text style={tw`text-gray-900 ml-2 mb-2 font-medium ${stylesLabel ?? ''}`}>{label}</Text>
      ) : null}
      <TextInput
        autoCapitalize="none"
        style={tw`placeholder:text-red-400 rounded-md px-4 py-3 border ${focusStyle} ${
          styles ?? ''
        } text-base leading-5`}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder ?? ''}
        placeholderTextColor={'#6B7280'}
        keyboardType={keyboardType ?? 'default'}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {!!error ? (
        <Text style={tw`absolute bottom-0 left-2 text-red-700 text-sm`}>{error.message}</Text>
      ) : null}
    </View>
  );
};

interface IProps {
  value: string;
  label?: string;
  onChange: (v: string) => void;
  error?: FieldError;
  placeholder?: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'email-address'
    | 'phone-pad'
    | 'numeric'
    | 'ascii-capable';
  styles?: string;
  stylesLabel?: string;
}
