import { View, Text, TouchableOpacity } from 'react-native';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';
import { useBuyStocks } from '@/hooks/form/use-buy-stocks';
import { FC } from 'react';
import { IBusinessState } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteSmallBusinessInList } from '@/slices/game.slice';
import { useRouter } from 'expo-router';
import { TypeNavigation } from '@/types';

export const SmallBusinessListComponent: FC<IProps> = ({ list }) => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const navigation = useRouter();

  const dispatch = useAppDispatch();

  if (!list.length) return null;

  const onDeleteBigBusiness = (business: IBusinessState) => {
    if (!currentUser?.id) return;
    dispatch(deleteSmallBusinessInList({ id: currentUser.id, business }));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useBuyStocks();

  const onIncreaseIncome = (id: string) => {};

  if (!list.length) return <></>;

  return (
    <View>
      <Text style={tw`py-2 border-t border-b border-orange-500 mb-2 text-lg font-bold text-center`}>
        Small Businesses
      </Text>
      {list.map((item, key) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(TypeNavigation.POOR_CIRCLE_SMALL_BUSINESS_ITEM_MODAL, {
              id: item.id,
            })
          }
          key={key}
          style={tw`mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600`}
        >
          <RowComponent>
            <Text style={tw`text-base text-white font-medium w-[50%]`}>Small Bussiness</Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>$ {item.income}</Text>
            <AntDesign
              name="minuscircle"
              size={32}
              style={tw`text-red-500`}
              onPress={() => onDeleteBigBusiness(item)}
            />
          </RowComponent>
        </TouchableOpacity>
      ))}
    </View>
  );
};

interface IProps {
  list: IBusinessState[];
}
