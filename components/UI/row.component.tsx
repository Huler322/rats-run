import { FC, ReactNode } from 'react';

import tw from '@/lib/tailwind';
import { View } from 'react-native';

export const RowComponent: FC<IProps> = ({ children, styles }) => {
  return (
    <View style={tw`flex flex-row items-center justify-between ${styles ?? ''}`}>{children}</View>
  );
};

interface IProps {
  children: ReactNode;
  styles?: string;
}
