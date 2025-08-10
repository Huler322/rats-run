import { RowComponent } from '@/components/UI/row.component';
import { Alert, Text } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { TypeNavigation } from '@/types';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTotalSalary, getTotalSpending } from '@/helpers/balance-helper';
import Decimal from 'decimal.js';
import { deleteBigBusinessInList, quitFromJob } from '@/slices/game.slice';

export const UserBalancesComponent = () => {
  const dispatch = useAppDispatch();

  const navigation = useRouter();

  const { currentUser, poorCircle, richCircle } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const countSmallBusinesses = poorCircle?.smallBusiness[currentUser.id]?.list?.length ?? 0;
  const countBigBusinesses = poorCircle?.bigBusiness[currentUser.id]?.list?.length ?? 0;

  const totalSpending = getTotalSpending(currentUser);
  const totalIncome = getTotalSalary(currentUser, poorCircle, richCircle);
  const totalSalary = new Decimal(totalIncome).minus(totalSpending).toString();

  const isShowButtonQuitFromJob =
    currentUser.profession.length && new Decimal(currentUser.salary.salary).greaterThan(0);

  const isShowButtonGetNewJob =
    !currentUser.profession.length &&
    new Decimal(currentUser.salary.salary).eq(0) &&
    countBigBusinesses === 0 &&
    countSmallBusinesses < 2;

  const onQuitFromJob = () => {
    Alert.alert('Are you sure want to quit from job?', '', [
      {
        style: 'cancel',
        text: 'Keep',
      },
      {
        onPress: () => dispatch(quitFromJob()),
        text: 'Yep',
      },
    ]);
  };

  return (
    <>
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

      {isShowButtonQuitFromJob ? (
        <RowComponent styles={'mb-2'}>
          <ButtonComponent styles="w-full" title="Quit from job" onPress={onQuitFromJob} />
        </RowComponent>
      ) : null}

      {isShowButtonGetNewJob ? (
        <RowComponent styles="mb-2">
          <ButtonComponent
            styles="w-full"
            title="Get a new job"
            onPress={() =>
              navigation.push({
                pathname: TypeNavigation.CREATE_OR_EDIT_USER,
                params: { id: currentUser.id },
              })
            }
          />
        </RowComponent>
      ) : null}
    </>
  );
};
