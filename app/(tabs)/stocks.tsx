import { ButtonComponent } from '@/components/buttons/button.component';
import { HeaderComponent } from '@/components/header/header.component';
import { InputComponent } from '@/components/inputs/input.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { RowComponent } from '@/components/UI/row.component';
import { useBuyStocks } from '@/hooks/useBuyStocks';
import tw from '@/lib/tailwind';
import { useAppDispatch } from '@/store';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';

const stocks = [
  { count: '15', name: 'GDV', price: '10' },
  { count: '15', name: 'GDV', price: '10' },
];

export default function StocksScreen() {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useBuyStocks();

  const onBuyStocks = () => {
    // const values = getValues();
    // console.log('onSave values', values);
    // const id = generateNonce();
    // console.log('id', id);
    // const createdUser: IUser = {
    //   ...values,
    //   id,
    //   status: UserStatus.created,
    // };
    // dispatch(setUserInList(createdUser));
  };

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <View style={tw`mb-8`}>
        <RowComponent>
          <View style={tw`w-[55%]`}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder={'Stock name'}
                  // error={errors.name}
                  label={'Stock name'}
                />
              )}
              name="name"
              defaultValue=""
            />
          </View>
          <View style={tw`w-[20%]`}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder={'22'}
                  // error={errors.count}
                  label={'Count'}
                />
              )}
              name="count"
              defaultValue=""
            />
          </View>
          <View style={tw`w-[20%]`}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder={'15'}
                  // error={errors.price}
                  label={'Price'}
                />
              )}
              name="price"
              defaultValue=""
            />
          </View>
        </RowComponent>
        <ButtonComponent onPress={handleSubmit(onBuyStocks)} title={'Buy Stock'} />
      </View>

      {stocks.length ? (
        <View>
          <RowComponent styles={'px-3 py-3 border-b border-gray-600 mb-4'}>
            <Text style={tw`text-base text-gray-900 font-medium w-[50%]`}>Stock name</Text>
            <Text style={tw`text-base text-orange-500 font-medium text-center w-[22%]`}>Count</Text>
            <Text style={tw`text-base text-orange-500 font-medium text-right w-[22%]`}>Price</Text>
          </RowComponent>
          {stocks.map((stock, key) => (
            <View key={key}>
              <RowComponent
                styles="px-3 bg-gray-800 rounded-lg overflow-hidden mb-2 py-3 border-b border-gray-600"
                key={key}
              >
                <Text style={tw`text-base text-white font-medium w-[50%]`}>{stock.name}</Text>
                <Text style={tw`text-base text-orange-500 font-medium text-center w-[22%]`}>
                  {stock.count}
                </Text>
                <Text style={tw`text-base text-orange-500 font-medium text-right w-[22%]`}>
                  {stock.price}
                </Text>
              </RowComponent>
            </View>
          ))}
        </View>
      ) : null}
    </ContainerScrollComponent>
  );
}
