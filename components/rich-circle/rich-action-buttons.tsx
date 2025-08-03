import { View } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';

export const RichActionButtons = () => {
  const handleDivorce = () => {};
  const handleTax = () => {};

  return (
    <View style={tw`flex flex-row gap-4 items-center justify-between`}>
      <ButtonComponent styles={'w-[45%]'} title="Divorce" onPress={handleDivorce} />
      <ButtonComponent styles={'w-[45%]'} title="Tax 10%" onPress={handleTax} />
    </View>
  );
};
