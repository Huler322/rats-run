import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { RowComponent } from '@/components/UI/row.component';
import { ButtonComponent } from '@/components/buttons/button.component';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteSmallBusinessInList } from '@/slices/game.slice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TypeNavigation } from '@/types';
import { useEffect } from 'react';

const PoorCircleSmallBusinessItemModal = () => {
  const { id } = useLocalSearchParams();

  const navigation = useRouter();
  const dispatch = useAppDispatch();

  const { currentUser, poorCircle } = useAppSelector(({ game }) => game);

  if (!currentUser) return <></>;

  const smallBusinessList = poorCircle.smallBusiness[currentUser.id]?.list ?? [];

  const currentBusiness = smallBusinessList?.find((business) => business.id === id);

  const onDeleteSmallBusiness = () => {
    if (!currentBusiness) return;
    dispatch(deleteSmallBusinessInList({ id: currentUser.id, business: currentBusiness }));
    navigation.back();
  };

  const onIncreaseIncome = () => {};

  return (
    <View style={tw`py-8 px-4 items-center justify-center h-full w-full`}>
      <View style={tw`mb-10`}>
        <Text style={tw`font-bold text-lg mb-1 text-center`}>Business</Text>
        <ButtonComponent title="Delete business" onPress={() => onDeleteSmallBusiness()} />
      </View>

      <RowComponent styles="justify-between mb-4 w-full">
        <Text style={tw`font-regular text-lg`}>Business price:</Text>
        <Text style={tw`font-bold text-lg`}>$ {currentBusiness?.price ?? ''}</Text>
      </RowComponent>

      <RowComponent styles="justify-between mb-10 w-full">
        <Text style={tw`font-regular text-lg`}>Income:</Text>
        <Text style={tw`font-bold text-lg`}>$ {currentBusiness?.income ?? ''}</Text>
      </RowComponent>

      <Text style={tw`text-center mb-2 text-base px-2`}>Use to expand your business</Text>
      {/*<View style={tw`mb-2 w-full`}>*/}
      {/*  <Controller*/}
      {/*    control={control}*/}
      {/*    render={({ field: { onChange, value } }) => (*/}
      {/*      <InputComponent*/}
      {/*        value={value}*/}
      {/*        onChange={onChange}*/}
      {/*        // error={errors.name}*/}
      {/*        placeholder={'200$'}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*    name="name"*/}
      {/*    defaultValue=""*/}
      {/*  />*/}
      {/*</View>*/}
      <ButtonComponent styles="w-full" title="Increase income" onPress={onIncreaseIncome} />
    </View>
  );
};

export default PoorCircleSmallBusinessItemModal;
