import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { useAppSelector } from '@/store';
import { Text } from 'react-native';

export const HeaderComponent = () => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const formatCapitalWithSpaces = (num) => {
    return currentUser.currentCapital.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Balance:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {formatCapitalWithSpaces()}</Text>
      </RowComponent>
    </>
  );
};
