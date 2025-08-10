import { View, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { RowComponent } from '@/components/UI/row.component';
import { ButtonComponent } from '@/components/buttons/button.component';

const PoorCircleBigBusinessItemModal = () => {
  const onDeleteBigBusiness = (id: string) => {};

  return (
    <View style={tw`py-8 px-4 items-center justify-center h-full w-full`}>
      <View style={tw`mb-10`}>
        <Text style={tw`font-bold text-lg mb-1 text-center`}>Big Business</Text>
        <ButtonComponent title="Delete business" onPress={() => onDeleteBigBusiness(item.id)} />
      </View>

      <RowComponent styles="justify-between mb-10 w-full">
        <Text style={tw`font-regular text-lg`}>Income:</Text>
        <Text style={tw`font-bold text-lg`}>$ item.income</Text>
      </RowComponent>
    </View>
  );
};

export default PoorCircleBigBusinessItemModal;
