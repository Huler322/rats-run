import { View, Text, Alert } from 'react-native';
import tw from '@/lib/tailwind';
import { RowComponent } from '@/components/UI/row.component';
import { ButtonComponent } from '@/components/buttons/button.component';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  deleteSmallBusinessInList,
  quitFromJob,
  updateSmallBusinessList,
} from '@/slices/game.slice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAmount } from '@/hooks/form/use-amount';
import { InputComponent } from '@/components/inputs/input.component';
import { Controller } from 'react-hook-form';
import Decimal from 'decimal.js';
import { ContainerComponent } from '@/components/templates/container.component';

const PoorCircleSmallBusinessItemModal = () => {
  const { id } = useLocalSearchParams();

  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const { currentUser, poorCircle } = useAppSelector(({ game }) => game);

  const {
    control,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useAmount();

  if (!currentUser) return <></>;

  const isUserAlreadyQuiteFromJob = new Decimal(currentUser?.salary?.salary ?? 0).eq(0);

  const smallBusinessList = poorCircle.smallBusiness[currentUser.id]?.list ?? [];

  const foundBusiness = smallBusinessList?.find((business) => business.id === id);

  const onDeleteSmallBusiness = () => {
    if (!foundBusiness) return;
    Alert.alert('Are you sure want to delete business?', '', [
      {
        style: 'cancel',
        text: 'Keep',
      },
      {
        onPress: () => {
          dispatch(deleteSmallBusinessInList({ id: currentUser.id, business: foundBusiness }));
          navigation.back();
        },
        text: 'Delete',
      },
    ]);
  };

  const onIncreaseIncome = () => {
    if (!foundBusiness) return;
    const values = getValues();
    const updatedBusinessIncome = new Decimal(foundBusiness.income)
      .plus(new Decimal(values.amount))
      .toString();
    if (isUserAlreadyQuiteFromJob) {
      dispatch(
        updateSmallBusinessList({
          id: currentUser.id,
          business: { ...foundBusiness, income: updatedBusinessIncome },
        }),
      );
      reset();
      navigation.back();
      return;
    }
    Alert.alert(
      'If you want to grow your small business, you need to quit your job.',
      'Do you want to quit your job and expand your business?',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: () => {
            dispatch(
              updateSmallBusinessList({
                id: currentUser.id,
                business: { ...foundBusiness, income: updatedBusinessIncome },
              }),
            );
            dispatch(quitFromJob());
            reset();
            navigation.back();
          },
          text: 'Increase',
        },
      ],
    );
  };

  return (
    <ContainerComponent styles={'bg-white'}>
      <View style={tw`items-center justify-center h-full w-full`}>
        <View style={tw`mb-10`}>
          <Text style={tw`font-bold text-lg mb-1 text-center`}>Business</Text>
          <ButtonComponent title="Delete business" onPress={() => onDeleteSmallBusiness()} />
        </View>

        <RowComponent styles="justify-between mb-4 w-full">
          <Text style={tw`font-regular text-lg`}>Business price:</Text>
          <Text style={tw`font-bold text-lg`}>$ {foundBusiness?.price ?? ''}</Text>
        </RowComponent>

        <RowComponent styles="justify-between mb-10 w-full">
          <Text style={tw`font-regular text-lg`}>Income:</Text>
          <Text style={tw`font-bold text-lg`}>$ {foundBusiness?.income ?? ''}</Text>
        </RowComponent>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputComponent
              styles={'w-full'}
              stylesContainer={'w-full'}
              value={value}
              onChange={onChange}
              withMessage={true}
              error={errors.amount}
              placeholder={'0'}
              keyboardType={'number-pad'}
            />
          )}
          name="amount"
          defaultValue=""
        />

        <Text style={tw`text-center mb-2 text-base px-2`}>Use to expand your business</Text>
        <ButtonComponent
          styles="w-full"
          title="Increase income"
          onPress={handleSubmit(onIncreaseIncome)}
        />
      </View>
    </ContainerComponent>
  );
};

export default PoorCircleSmallBusinessItemModal;
