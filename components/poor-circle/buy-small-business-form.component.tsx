import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSmallBusinessList } from '@/slices/game.slice';
import { useBuyBusiness } from '@/hooks/form/use-buy-business';
import { generateNonce } from '@/helpers';

export const BuySmallBusinessFormComponent = () => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useBuyBusiness(currentUser);

  const onBuySmallBusiness = () => {
    if (!currentUser) return;
    const values = getValues();
    const id = generateNonce();
    dispatch(setSmallBusinessList({ id: currentUser.id, business: { ...values, id } }));
    reset();
  };

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
              error={errors.price}
              label={'Business price'}
              withMessage={true}
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
              withMessage={true}
            />
          )}
          name="income"
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
