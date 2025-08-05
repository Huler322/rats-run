import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';

const MinusCapitalModal = () => {
  const handleMinusMoneyToCapital = () => {};

  return (
    <View style={tw`py-8 px-4 items-center justify-center h-full`}>
      <Text style={tw`font-bold text-lg mb-1`}>Lost money from capital</Text>
      <Text style={tw`text-center px-8 mb-4 text-base`}>
        Lost from money down the drain / buying lands & apartments & cars
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
      <ButtonComponent
        styles="mt-2 w-full"
        title="Lost money"
        onPress={handleMinusMoneyToCapital}
      />
    </View>
  );
};

export default MinusCapitalModal;
