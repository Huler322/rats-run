import { Text, View } from 'react-native';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AntDesign } from '@expo/vector-icons';

const richBusinessList = [
  { id: 1, name: 'Hugo Boss', price: 275000, income: 12000 },
  { id: 2, name: 'Zavod strausov', price: 333000, income: 33000 },
];

export const RichBusinessListComponent = () => {
  return (
    <View>
      {richBusinessList.map((item, key) => (
        <View
          style={tw`bg-gray-800 rounded-lg overflow-hidden py-2 border-b border-gray-600 mb-2 px-3`}
          key={key}
        >
          <RowComponent>
            <Text style={tw`text-base text-white font-medium w-[50%]`}>{item.name}</Text>
            <AntDesign
              name="minuscircle"
              size={32}
              style={tw`text-red-500`}
              onPress={() => onDeleteBigBusiness(item.id)}
            />
          </RowComponent>

          <RowComponent styles="">
            <Text style={tw`text-base text-orange-500 font-medium`}>
              <Text style={tw`text-base text-white`}>Price: </Text> $ {item.price}
            </Text>
            <Text style={tw`text-base text-orange-500 font-medium`}>
              <Text style={tw`text-base text-white`}>Income: </Text>$ {item.income}
            </Text>
          </RowComponent>
        </View>
      ))}
    </View>
  );
};
