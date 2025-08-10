import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { RowComponent } from '@/components/UI/row.component';
import { FieldUpdateSpend } from '@/components/user-info/field-update-spend.component';
import { maxChildCount } from '@/constants';
import { getTotalSpending } from '@/helpers/balance-helper';
import tw from '@/lib/tailwind';
import {
  closeCreditApartment,
  closeCreditCar,
  minusChild,
  plusChild,
  setGrandfatherValue,
  setGrandmotherValue,
} from '@/slices/game.slice';
import { useAppDispatch } from '@/store';
import { IUser } from '@/store/types';
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Decimal from 'decimal.js';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export const UserSpendingComponent: FC<IProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  const navigation = useRouter();

  const totalSpending = getTotalSpending(currentUser);

  const countChilde = new Decimal(currentUser.spending.child.count);

  const isPossibleCloseCreditCar = currentUser?.spending?.creditCar?.full?.length
    ? new Decimal(currentUser.currentCapital).greaterThanOrEqualTo(
        new Decimal(currentUser?.spending?.creditCar?.full),
      ) && new Decimal(currentUser?.spending?.creditCar?.full).gt(0)
    : false;

  const isPossibleCloseCreditApartment = currentUser?.spending?.creditApartments?.full.length
    ? new Decimal(currentUser.currentCapital).greaterThanOrEqualTo(
        new Decimal(currentUser?.spending?.creditApartments?.full),
      ) && new Decimal(currentUser?.spending?.creditApartments?.full).gt(0)
    : false;

  const onPlusChild = () => {
    if (countChilde.eq(maxChildCount)) return;
    dispatch(plusChild(currentUser));
  };

  const onMinusChild = () => {
    if (countChilde.eq(0)) return;
    dispatch(minusChild(currentUser));
  };

  const onCloseCarCredit = () => {
    dispatch(closeCreditCar(currentUser));
  };

  const onCloseApartmentCredit = () => {
    dispatch(closeCreditApartment(currentUser));
  };

  const onSetGrandmotherValue = (value: string) => {
    dispatch(setGrandmotherValue({ id: currentUser.id, value }));
  };
  const onSetAddGrandfatherValue = (value: string) => {
    dispatch(setGrandfatherValue({ id: currentUser.id, value }));
  };

  return (
    <View style={tw`mb-4`}>
      <View style={tw`bg-gray-800 rounded-lg overflow-hidden mb-4`}>
        <RowComponent styles={`px-4 py-3 border-b border-gray-600`}>
          <AntDesign name="arrowleft" size={24} color="white" onPress={() => navigation.back()} />
          <Text style={tw`text-center text-lg font-medium text-white`}>Spending</Text>
          <View />
        </RowComponent>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 ">
          <View style={tw`flex-row items-center`}>
            <Ionicons name="home-outline" size={16} style={tw`text-orange-400`} />
            <Text style={tw`text-base text-gray-300 ml-2`}>Apartments</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.apartments}
          </Text>
        </RowComponent>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 ">
          <View style={tw`flex-row items-center`}>
            <Ionicons name="fast-food-outline" size={16} style={tw`text-orange-400`} />
            <Text style={tw`text-base text-gray-300 ml-2`}>Food</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.food}
          </Text>
        </RowComponent>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 ">
          <View style={tw`flex-row items-center`}>
            <Entypo name="open-book" size={16} style={tw`text-orange-400`} />
            <Text style={tw`text-base text-gray-300 ml-2`}>Education</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.education}
          </Text>
        </RowComponent>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 ">
          <View style={tw`flex-row items-center`}>
            <Ionicons name="shirt-outline" size={16} style={tw`text-orange-400`} />
            <Text style={tw`text-base text-gray-300 ml-2`}>Clothes</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.clothes}
          </Text>
        </RowComponent>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 ">
          <View style={tw`flex-row items-center`}>
            <AntDesign name="wifi" size={16} style={tw`text-orange-400`} />
            <Text style={tw`text-base text-gray-300 ml-2`}>Internet</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.internet}
          </Text>
        </RowComponent>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 ">
          <View style={tw`flex-row items-center`}>
            <Ionicons name="bus-outline" size={16} style={tw`text-orange-400`} />
            <Text style={tw`text-base text-gray-300 ml-2`}>Travel</Text>
          </View>
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.travel}
          </Text>
        </RowComponent>
        <View style={tw`border-b border-gray-600 px-4 py-2`}>
          <RowComponent>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="home-outline" size={16} style={tw`text-orange-400`} />
              <Text style={tw`text-base text-gray-300 ml-2`}>
                Credit Apts ($ {currentUser.spending.creditApartments.full})
              </Text>
            </View>
            <Text style={tw`text-base text-orange-400 font-semibold`}>
              $ {currentUser.spending.creditApartments.month}
            </Text>
          </RowComponent>
          {isPossibleCloseCreditApartment ? (
            <RowComponent styles="justify-end mt-2 w-full">
              <ButtonComponent
                title="Close credit"
                onPress={onCloseApartmentCredit}
                styles={'w-full mt-5'}
              />
            </RowComponent>
          ) : null}
        </View>

        <View style={tw`border-b border-gray-600 px-4 py-2`}>
          <RowComponent>
            <View style={tw`flex-row items-center`}>
              <AntDesign name="car" size={16} style={tw`text-orange-400`} />
              <Text style={tw`text-base text-gray-300 ml-2`}>
                Credit car ($ {currentUser.spending.creditCar.full})
              </Text>
            </View>
            <Text style={tw`text-base text-orange-400 font-semibold mr-2`}>
              $ {currentUser.spending.creditCar.month}
            </Text>
          </RowComponent>
          {isPossibleCloseCreditCar ? (
            <RowComponent styles="justify-end mt-2 w-full">
              <ButtonComponent
                title="Close credit"
                onPress={onCloseCarCredit}
                styles={'w-full mt-5'}
              />
            </RowComponent>
          ) : null}
        </View>

        <RowComponent styles="px-4 py-2 border-b border-gray-600 flex-col w-full">
          <View style={tw`flex flex-row items-center justify-between w-full`}>
            <View style={tw`flex-row items-center`}>
              <MaterialIcons name="child-care" size={16} style={tw`text-orange-400`} />
              <Text style={tw`text-base text-gray-300 ml-2 mr-5`}>Child</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-base text-orange-400 font-semibold ml-5`}>
                $ {currentUser.spending.child.cost}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between w-full mt-5 px-5`}>
            <AntDesign name="pluscircleo" size={44} color="orange" onPress={onPlusChild} />
            <Text style={tw`text-base text-orange-400 font-semibold ml-5`}>
              {currentUser.spending.child.count}
            </Text>
            <AntDesign name="minuscircleo" size={44} color="orange" onPress={onMinusChild} />
          </View>
        </RowComponent>

        <View style={tw`border-b border-gray-600 px-4 py-2`}>
          <RowComponent styles={'mb-5'}>
            <View style={tw`flex-row items-center`}>
              <MaterialIcons name="elderly-woman" size={16} style={tw`text-orange-400`} />
              <Text style={tw`text-base text-gray-300 ml-2`}>Grandmother</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-base text-orange-400 font-semibold mr-1`}>
                ${' '}
                {currentUser?.spending?.caringGrandmother?.length
                  ? currentUser?.spending?.caringGrandmother
                  : '0'}
              </Text>
            </View>
          </RowComponent>
          <FieldUpdateSpend
            onPress={onSetGrandmotherValue}
            label={'Cost for Grandmother'}
            placeholder={'cost'}
          />
        </View>
        <View style={tw`border-b border-gray-600 px-4 py-2`}>
          <RowComponent styles="mb-5 ">
            <View style={tw`flex-row items-center`}>
              <MaterialIcons name="elderly" size={16} style={tw`text-orange-400`} />
              <Text style={tw`text-base text-gray-300 ml-2`}>Grandfather</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-base text-orange-400 font-semibold mr-1`}>
                ${' '}
                {currentUser?.spending?.caringGrandfather?.length
                  ? currentUser?.spending?.caringGrandfather
                  : '0'}
              </Text>
            </View>
          </RowComponent>
          <FieldUpdateSpend
            onPress={onSetAddGrandfatherValue}
            label={'Cost for Grandfather'}
            placeholder={'cost'}
          />
        </View>

        <RowComponent styles="px-4 py-2 border-t border-gray-600 ">
          <Text style={tw`text-base font-bold text-white`}>Total Spending</Text>
          <Text style={tw`text-base font-bold text-orange-400`}>$ {totalSpending}</Text>
        </RowComponent>
      </View>
    </View>
  );
};

interface IProps {
  currentUser: IUser;
}
