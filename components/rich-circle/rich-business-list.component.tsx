import { Text, View } from 'react-native';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';
import { FC } from 'react';
import { IRichBusinessState } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteRichBusinessInList } from '@/slices/game.slice';

export const RichBusinessListComponent: FC<IProps> = ({ list }) => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

  const onDeleteBusiness = (business: IRichBusinessState) => {
    if (!currentUser) return;
    dispatch(deleteRichBusinessInList({ id: currentUser.id, business }));
  };

  return (
    <View>
      {list.map((item, key) => (
        <View
          style={tw`bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600 mb-2 px-3`}
          key={key}
        >
          <RowComponent>
            <Text style={tw`text-base text-white font-medium w-[50%]`}>{item.name}</Text>
            <AntDesign
              name="minuscircle"
              size={32}
              style={tw`text-red-500`}
              onPress={() => onDeleteBusiness(item)}
            />
          </RowComponent>

          <RowComponent styles="">
            <Text style={tw`text-base text-orange-500 font-medium`}>
              <Text style={tw`text-base text-white`}>Price: </Text> $ {item.price}
            </Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>
              <Text style={tw`text-base text-white`}>Income: </Text>$ {item.income}
            </Text>
          </RowComponent>
        </View>
      ))}
    </View>
  );
};

interface IProps {
  list: IRichBusinessState[];
}
