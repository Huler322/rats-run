import { View } from 'react-native';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { InputComponent } from '@/components/inputs/input.component';
import { ButtonComponent } from '@/components/buttons/button.component';
import { RowComponent } from '@/components/UI/row.component';
import { useRichBuyBusiness } from '@/hooks/form/use-buy-rich-business';
import { useAppDispatch, useAppSelector } from '@/store';
import { generateNonce } from '@/helpers';
import { setRichBusinessList } from '@/slices/game.slice';

export const RichAddBusinessForm = () => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useRichBuyBusiness(currentUser);

  const onBuyBusiness = () => {
    if (!currentUser) return;
    const values = getValues();
    const id = generateNonce();
    dispatch(setRichBusinessList({ id: currentUser.id, business: { ...values, id } }));
    reset();
  };

  return (
    <View style={tw`mb-2 mt-2`}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputComponent
            value={value}
            onChange={onChange}
            placeholder={'Hugo Boss'}
            error={errors.name}
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
                error={errors.price}
                label={'Business price'}
              />
            )}
            name="price"
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
                error={errors.income}
                label={'Income'}
              />
            )}
            name="income"
            defaultValue=""
          />
        </View>
        <ButtonComponent title="Buy" styles="w-[28%] px-2" onPress={handleSubmit(onBuyBusiness)} />
      </RowComponent>
    </View>
  );
};
