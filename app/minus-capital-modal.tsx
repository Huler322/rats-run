import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { Controller } from 'react-hook-form';
import { InputComponent } from '@/components/inputs/input.component';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store';
import { useAmount } from '@/hooks/form/use-amount';
import { minusInCapital } from '@/slices/game.slice';
import { ContainerComponent } from '@/components/templates/container.component';

const MinusCapitalModal = () => {
  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(({ game }) => game);

  const {
    control,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useAmount();

  const minusMoneyToCapital = () => {
    if (!currentUser) return;
    const values = getValues();
    dispatch(minusInCapital({ user: currentUser, amount: values.amount }));
    reset();
    navigation.back();
  };

  return (
    <ContainerComponent>
      <View style={tw`items-center justify-center h-full`}>
        <Text style={tw`font-bold text-lg mb-1`}>Lost money from capital</Text>
        <Text style={tw`text-center px-8 mb-4 text-base`}>
          Lost from money down the drain / buying lands & apartments & cars
        </Text>
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
        <ButtonComponent
          styles="mt-2 w-full"
          title="Lost money"
          onPress={handleSubmit(minusMoneyToCapital)}
        />
      </View>
    </ContainerComponent>
  );
};

export default MinusCapitalModal;
