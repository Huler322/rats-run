import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { useAppSelector } from '@/store';
import { Text } from 'react-native';
import { getTotalSalary, getTotalSpending } from '@/helpers/balance-helper';
import { ButtonComponent } from '@/components/buttons/button.component';
import { TypeNavigation } from '@/types';
import { useRouter } from 'expo-router';
import Decimal from 'decimal.js';

export const HeaderComponent = () => {
  const navigation = useRouter();

  const { currentUser, poorCircle, richCircle } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const totalSpending = getTotalSpending(currentUser);
  const totalIncome = getTotalSalary(currentUser, poorCircle, richCircle);
  const totalSalary = new Decimal(totalIncome).minus(totalSpending).toString();

  return (
    <>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Balance:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {currentUser.currentCapital}</Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Salary:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {currentUser.salary.salary}</Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total income:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {totalIncome}</Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total income apartments:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>
          $ {currentUser.salary.passiveImmovableSalary}
        </Text>
      </RowComponent>
      <RowComponent styles="mb-1 p-2 rounded-md bg-gray-200">
        <Text style={tw`text-lg font-medium`}>Total Salary:</Text>
        <Text style={tw`text-lg text-orange-500 font-bold`}>$ {totalSalary}</Text>
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
          onPress={() => navigation.navigate(TypeNavigation.MINUS_CAPITAL_MODAL)}
        />
      </RowComponent>
    </>
  );
};
