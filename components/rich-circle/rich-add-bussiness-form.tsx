import { View } from 'react-native';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { InputComponent } from '@/components/inputs/input.component';
import { ButtonComponent } from '@/components/buttons/button.component';
import { RowComponent } from '@/components/UI/row.component';
import { useBuyStocks } from '@/hooks/form/use-buy-stocks';

export const RichAddBussinessForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    // reset,
  } = useBuyStocks();

  const onBuyBusiness = () => {};

  return (
    <View style={tw`mb-2 mt-2`}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputComponent
            value={value}
            onChange={onChange}
            placeholder={'Hugo Boss'}
            // error={errors.name}
            label={'Business name'}
          />
        )}
        name="name"
        defaultValue=""
      />
      <RowComponent>
        <View style={tw`w-[35%]`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                value={value}
                onChange={onChange}
                placeholder={'430900'}
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
        <ButtonComponent title="Buy" styles="w-[28%] px-2" onPress={handleSubmit(onBuyBusiness)} />
      </RowComponent>
    </View>
  );
};
