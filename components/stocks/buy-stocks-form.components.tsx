import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { useBuyStocks } from '@/hooks/useBuyStocks';
import tw from '@/lib/tailwind';
import { useAppDispatch } from '@/store';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

export const BuyStocksFormComponents = () => {
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
  );
};
