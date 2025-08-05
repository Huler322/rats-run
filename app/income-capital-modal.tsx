import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { Controller } from 'react-hook-form';

const IncomeCapitalModal = () => {
  const handleAddMoneyToCapital = () => {};

  return (
    <View style={tw`py-8 px-4 items-center justify-center h-full`}>
      <Text style={tw`font-bold text-lg mb-1`}>Add money to capital</Text>
      <Text style={tw`text-center px-8 mb-4 text-base`}>
        Add money from land sale / sell apartments & houses / odd jobs
      </Text>
      {/*<Controller*/}
      {/*  control={control}*/}
      {/*  render={({ field: { onChange, value } }) => (*/}
      {/*    <InputComponent*/}
      {/*      value={value}*/}
      {/*      onChange={onChange}*/}
      {/*      // error={errors.name}*/}
      {/*      placeholder={'5000$'}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*  name="name"*/}
      {/*  defaultValue=""*/}
      {/*/>*/}
      <ButtonComponent styles="mt-2 w-full" title="Add money" onPress={handleAddMoneyToCapital} />
    </View>
  );
};

export default IncomeCapitalModal;
