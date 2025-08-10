import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { useAppSelector } from '@/store';
import { Text } from 'react-native';
import { getTotalSpending } from '@/helpers/balance-helper';
import { ButtonComponent } from '@/components/buttons/button.component';
import { TypeNavigation } from '@/types';
import { useRouter } from 'expo-router';

export const HeaderComponent = () => {
  const navigation = useRouter();

  const { currentUser } = useAppSelector(({ game }) => game);
  const totalSpending = getTotalSpending(currentUser);

  if (!currentUser) return null;

  return (
    <>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Balance:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {currentUser.currentCapital}</Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Profession Salary:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {currentUser.salary.salary}</Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Passive income:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>
          $ {currentUser.salary.passiveBusinessSalary}
        </Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total income apartments:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>
          $ {currentUser.salary.passiveImmovableSalary}
        </Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Salary:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ </Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Spending:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {totalSpending}</Text>
      </RowComponent>

      <RowComponent styles="mb-2">
        <ButtonComponent
          styles="w-[48%]"
          title="Income"
          onPress={() => navigation.navigate(TypeNavigation.INCOME_CAPITAL_MODAL)}
        />
        <ButtonComponent
          styles="w-[48%]"
          title="Minus"
          onPress={() => navigation.navigate(TypeNavigation.INCOME_CAPITAL_MODAL)}
        />
      </RowComponent>
    </>
  );
};
