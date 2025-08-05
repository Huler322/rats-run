import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { FC } from 'react';
import { IBusinessState } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteBigBusinessInList } from '@/slices/game.slice';

export const BigBusinessListComponent: FC<IProps> = ({ list }) => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

  const onDeleteBigBusiness = (business: IBusinessState) => {
    if (!currentUser?.id) return;
    dispatch(deleteBigBusinessInList({ id: currentUser.id, business }));
  };

  if (!list.length) return <></>;

  return (
    <View>
      <Text style={tw`py-2 border-t border-b border-orange-500 mb-2 text-lg font-bold text-center`}>
        Big Businesses
      </Text>
      {list.map((item, key) => (
        <View key={key}>
          <RowComponent styles="mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600">
            <Text style={tw`text-base text-white font-medium w-[50%]`}>Big Bussiness</Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>$ {item.income}</Text>
            <AntDesign
              name="minuscircle"
              size={32}
              style={tw`text-red-500`}
              onPress={() => onDeleteBigBusiness(item)}
            />
          </RowComponent>
        </View>
      ))}
    </View>
  );
};

interface IProps {
  list: IBusinessState[];
}
