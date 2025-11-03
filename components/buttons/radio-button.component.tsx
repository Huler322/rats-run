import { TouchableOpacity, View, Text } from 'react-native';
import { FC } from 'react';
import { AssetType } from '@/store/types';
import tw from '@/lib/tailwind';

export const RadioButton: FC<IProps> = ({ item, onSelect, isSelected, style }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={tw`mb-4 ${style ?? ''}`}>
      {isSelected ? (
        <View style={tw`flex flex-row items-center`}>
          <View style={tw`w-6 h-6 rounded-full bg-orange-500`} />
          <Text style={tw`ml-4 text-lg`}>{item.label}</Text>
        </View>
      ) : (
        <View style={tw`flex flex-row items-center`}>
          <View style={tw`w-6 h-6 rounded-full bg-gray-500`} />
          <Text style={tw`ml-4 text-lg`}>{item.label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export interface IRadioButton {
  id: number;
  label: string;
  value: string;
  type: AssetType;
}

interface IProps {
  item: IRadioButton;
  onSelect: (item: IRadioButton) => void;
  isSelected: boolean;
  style?: string;
}
