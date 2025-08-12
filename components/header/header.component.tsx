import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { useAppSelector } from '@/store';
import { Text } from 'react-native';

const formatCapitalWithSpaces = (currentCapital?: string) => {
  return currentCapital?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const HeaderComponent = () => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const formattedCapital = formatCapitalWithSpaces(currentUser?.currentCapital);

  return (
    <>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Balance:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {formattedCapital}</Text>
      </RowComponent>
    </>
  );
};
