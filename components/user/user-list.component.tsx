import { FC } from 'react';
import { View } from 'react-native';
import { IUser } from '@/store/types';
import { UserItemComponent } from '@/components/user/user-item.component';
import tw from '@/lib/tailwind';

export const UserListComponent: FC<IProps> = ({ list }) => {
  return (
    <View style={tw`flex flex-col`}>
      {list.map((item) => (
        <UserItemComponent item={item} />
      ))}
    </View>
  );
};

interface IProps {
  list: IUser[];
}
