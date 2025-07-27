import { FC } from 'react';

import { IUser } from '@/store/types';
import { Text, View } from 'react-native';

export const UserItemComponent: FC<IProps> = ({ item }) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.profession}</Text>
      <Text>{item.salary}</Text>
    </View>
  );
};

interface IProps {
  item: IUser;
}
