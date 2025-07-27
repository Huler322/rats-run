import { FC } from 'react';

import { CreateUserItem } from '@/components/user/create-user-item.component';
import { UserItemComponent } from '@/components/user/user-item.component';
import tw from '@/lib/tailwind';
import { IUser } from '@/store/types';
import { View } from 'react-native';

export const UserListComponent: FC<IProps> = ({ list }) => {
  return (
    <View style={tw`flex flex-col`}>
      {list.map((item, key) => (
        <UserItemComponent item={item} key={key} />
      ))}
      <CreateUserItem />
    </View>
  );
};

interface IProps {
  list: IUser[];
}
