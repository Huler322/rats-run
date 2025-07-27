import { FC } from 'react';
import { View } from 'react-native';
import { IUser } from '@/store/types';
import { UserItemComponent } from '@/components/user/user-item.component';

export const UserListComponent: FC<IProps> = ({ list }) => {
  return (
    <View>
      {list.map((item) => (
        <UserItemComponent item={item} />
      ))}
    </View>
  );
};

interface IProps {
  list: IUser[];
}
