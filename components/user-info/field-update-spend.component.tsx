import { FC, useState } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import tw from '@/lib/tailwind';
import { View } from 'react-native';

export const FieldUpdateSpend: FC<IProps> = ({ onPress, placeholder, label }) => {
  const [value, setValue] = useState('');

  const onAddForm = () => {
    if (!value.length) return;
    onPress(value);
    setValue('');
  };

  const onRemove = () => {
    onPress('0');
    setValue('');
  };

  return (
    <View>
      <InputComponent
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        label={label}
        keyboardType={'number-pad'}
        styles={'text-gray-300'}
        stylesLabel={'text-gray-300'}
      />
      <View style={tw`flex flex-row items-center justify-between`}>
        <ButtonComponent title="Add" onPress={onAddForm} styles={'w-[40%]'} />
        <ButtonComponent title="Remove" onPress={onRemove} styles={'w-[40%]'} />
      </View>
    </View>
  );
};

interface IProps {
  onPress: (v: string) => void;
  placeholder: string;
  label: string;
}
