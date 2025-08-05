import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { useBuyStocks } from '@/hooks/form/use-buy-stocks';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

export const BuySmallBusinessFormComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useBuyStocks();

  const onBuySmallBusiness = () => {};

  return (
    <RowComponent>
      <View style={tw`w-[35%]`}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputComponent
              value={value}
              onChange={onChange}
              placeholder={'1390'}
              // error={errors.name}
              label={'Business price'}
            />
          )}
          name="name"
          defaultValue=""
        />
      </View>
      <View style={tw`w-[35%]`}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputComponent
              value={value}
              onChange={onChange}
              placeholder={'125'}
              // error={errors.name}
              label={'Income'}
            />
          )}
          name="name"
          defaultValue=""
        />
      </View>
      <ButtonComponent
        styles="w-[28%] px-2"
        title="Buy Small"
        onPress={handleSubmit(onBuySmallBusiness)}
      />
    </RowComponent>
  );
};
