import { View, Text } from 'react-native';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';
import { InputComponent } from '@/components/inputs/input.component';
import { Controller } from 'react-hook-form';
import { useBuyStocks } from '@/hooks/form/use-buy-stocks';
import { FC } from 'react';
import { IBusinessState } from '@/store/types';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteSmallBusinessInList } from '@/slices/game.slice';

export const SmallBusinessListComponent: FC<IProps> = ({ list }) => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

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
        <View
          key={key}
          style={tw`mb-2 px-3 bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600`}
        >
          <RowComponent styles="mb-1">
            <Text style={tw`text-base text-white font-medium w-[50%]`}>Small Bussiness</Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>$ {item.income}</Text>
            <AntDesign
              name="minuscircle"
              size={32}
              style={tw`text-red-500`}
              onPress={() => onDeleteBigBusiness(item)}
            />
          </RowComponent>
          <RowComponent styles="items-start">
            <AntDesign
              name="pluscircle"
              size={32}
              style={tw`text-green-500 mt-2`}
              onPress={() => onIncreaseIncome(item.id)}
            />
            <View style={tw`w-3/4`}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputComponent
                    value={value}
                    onChange={onChange}
                    // error={errors.name}
                    placeholder={'Increase income'}
                  />
                )}
                name="name"
                defaultValue=""
              />
            </View>
          </RowComponent>
        </View>
      ))}
    </View>
  );
};

interface IProps {
  list: IBusinessState[];
}
