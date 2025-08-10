import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { Controller } from 'react-hook-form';
import { usePlusOrMinus } from '@/hooks/form/use-plus-or-minus';
import { useAppDispatch, useAppSelector } from '@/store';
import { plusInCapital } from '@/slices/game.slice';
import { useRouter } from 'expo-router';

const IncomeCapitalModal = () => {
  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(({ game }) => game);

  const {
    control,
    formState: { errors },
    getValues,
    reset,
  } = usePlusOrMinus();

  const addMoneyToCapital = () => {
    if (!currentUser) return;
    const values = getValues();
    dispatch(plusInCapital({ user: currentUser, amount: values.amount }));
    reset();
    navigation.back();
  };

  return (
    <View style={tw`py-8 px-4 items-center justify-center h-full w-full`}>
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
            error={errors.amount}
            placeholder={'0'}
          />
        )}
        name="amount"
        defaultValue=""
      />
      <ButtonComponent styles="mt-2 w-full" title="Add money" onPress={addMoneyToCapital} />
    </View>
  );
};

export default IncomeCapitalModal;
