import { FC } from 'react';
import { View } from 'react-native';
import { IUser } from '@/store/types';

export const UserItemComponent: FC<IProps> = ({ item }) => {
  return <View></View>;
};

interface IProps {
  item: IUser;
}
