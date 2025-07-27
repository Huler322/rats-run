import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { useSellStocks } from '@/hooks/useSellStocks';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

export const SellStocksFormComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useSellStocks();

  const onSellStocks = () => {};

  return (
    <RowComponent styles="items-start">
      <ButtonComponent
        title="Sell"
        onPress={handleSubmit(onSellStocks)}
        styles="bg-red-500 w-[50%]"
      />
      <View style={tw`w-[20%]`}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputComponent
              styles="text-center"
              value={value}
              onChange={onChange}
              placeholder={'250'}
              // error={errors.price}
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
              styles="text-center"
              value={value}
              onChange={onChange}
              placeholder={'120'}
              // error={errors.price}
            />
          )}
          name="price"
          defaultValue=""
        />
      </View>
    </RowComponent>
  );
};
