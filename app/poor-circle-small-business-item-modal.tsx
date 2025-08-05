import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { RowComponent } from '@/components/UI/row.component';
import { ButtonComponent } from '@/components/buttons/button.component';

const PoorCircleSmallBusinessItemModal = () => {
  const onDeleteBigBusiness = (id: string) => {};
  const onIncreaseIncome = (id: string) => {};

  return (
    <View style={tw`py-8 px-4 items-center justify-center h-full w-full`}>
      <View style={tw`mb-10`}>
        <Text style={tw`font-bold text-lg mb-1 text-center`}>Business</Text>
        <ButtonComponent title="Delete business" onPress={() => onDeleteBigBusiness(item.id)} />
      </View>

      <RowComponent styles="justify-between mb-10 w-full">
        <Text style={tw`font-regular text-lg`}>Income:</Text>
        <Text style={tw`font-bold text-lg`}>$ item.income</Text>
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
      <ButtonComponent
        styles="w-full"
        title="Increase income"
        onPress={() => onIncreaseIncome(item.id)}
      />
    </View>
  );
};

export default PoorCircleSmallBusinessItemModal;
