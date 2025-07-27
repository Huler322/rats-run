import { FC } from 'react';

import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { getTotalSpending } from '@/helpers/balance-helper';
import tw from '@/lib/tailwind';
import { IUser } from '@/store/types';
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export const UserSpendingComponent: FC<IProps> = ({ currentUser }) => {
  const totalSpending = getTotalSpending(currentUser);

  return (
    <View style={tw`bg-gray-800 rounded-lg overflow-hidden mb-4`}>
      {/* Header */}
      <View style={tw`px-4 py-3 border-b border-gray-600`}>
        <Text style={tw`text-center text-lg font-medium text-white`}>Spending</Text>
      </View>

      {/* Apartments */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <Ionicons name="home-outline" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Apartments</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.apartments}
        </Text>
      </RowComponent>

      {/* Food */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <Ionicons name="fast-food-outline" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Food</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.food}
        </Text>
      </RowComponent>

      {/* Education */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <Entypo name="open-book" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Education</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.education}
        </Text>
      </RowComponent>

      {/* Clothes */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <Ionicons name="shirt-outline" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Clothes</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.clothes}
        </Text>
      </RowComponent>

      {/* Internet */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <AntDesign name="wifi" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Internet</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.internet}
        </Text>
      </RowComponent>

      {/* Travel */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <Ionicons name="bus-outline" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Travel</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.travel}
        </Text>
      </RowComponent>

      {/* Credit Apartments */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <Ionicons name="home-outline" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Credit apartments</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.creditApartments.month}
        </Text>
      </RowComponent>

      {/* Credit Car */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <AntDesign name="car" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Credit car</Text>
        </View>
        <Text style={tw`text-base text-orange-400 font-semibold`}>
          $ {currentUser.spending.creditCar.month}
        </Text>
      </RowComponent>

      {/* Child */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="child-care" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Child</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <InputComponent
            style="w-16 text-center text-gray-100 mr-4"
            placeholder="0"
            keyboardType="numeric"
          />
          <Text style={tw`text-base text-orange-400 font-semibold`}>
            $ {currentUser.spending.child}
          </Text>
        </View>
      </RowComponent>

      {/* Grandmother */}
      <RowComponent styles="px-4 py-3 border-b border-gray-600 ">
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="elderly-woman" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Grandmother</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-base text-orange-400 font-semibold mr-1`}>$</Text>
          <InputComponent
            style="w-16 text-center text-gray-100"
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </RowComponent>

      {/* Grandfather */}
      <RowComponent styles="px-4 py-3 ">
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="elderly" size={16} style={tw`text-orange-400`} />
          <Text style={tw`text-base text-gray-300 ml-2`}>Grandfather</Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-base text-orange-400 font-semibold mr-1`}>$</Text>
          <InputComponent
            style="w-16 text-center text-gray-100"
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </RowComponent>

      {/* Total */}
      <RowComponent styles="px-4 py-3 border-t border-gray-600 ">
        <Text style={tw`text-base font-bold text-white`}>Total Spending</Text>
        <Text style={tw`text-base font-bold text-orange-400`}>$ {totalSpending}</Text>
      </RowComponent>
    </View>
  );
};

interface IProps {
  currentUser: IUser;
}
