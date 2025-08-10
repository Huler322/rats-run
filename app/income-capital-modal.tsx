import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { Controller } from 'react-hook-form';
import { useAmount } from '@/hooks/form/use-amount';
import { useAppDispatch, useAppSelector } from '@/store';
import { plusInCapital } from '@/slices/game.slice';
import { useRouter } from 'expo-router';
import { ContainerComponent } from '@/components/templates/container.component';

const IncomeCapitalModal = () => {
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

  const addMoneyToCapital = () => {
    if (!currentUser) return;
    const values = getValues();
    dispatch(plusInCapital({ user: currentUser, amount: values.amount }));
    reset();
    navigation.back();
  };

  return (
    <ContainerComponent>
      <View style={tw`items-center justify-center h-full w-full`}>
        <Text style={tw`font-bold text-lg mb-1`}>Add money to capital</Text>
        <Text style={tw`text-center px-8 mb-4 text-base`}>
          Add money from land sale / sell apartments & houses / odd jobs
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
          title="Add money"
          onPress={handleSubmit(addMoneyToCapital)}
        />
      </View>
    </ContainerComponent>
  );
};

export default IncomeCapitalModal;
