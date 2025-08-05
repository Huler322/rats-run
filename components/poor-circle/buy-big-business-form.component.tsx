import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useBuyBusiness } from '@/hooks/form/use-buy-business';
import { useAppDispatch, useAppSelector } from '@/store';
import { generateNonce } from '@/helpers';
import { setBigBusinessList } from '@/slices/game.slice';

export const BuyBigBusinessFormComponent = () => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useBuyBusiness(currentUser);

  const onBuyBigBusiness = () => {
    if (!currentUser) return;
    const values = getValues();
    const id = generateNonce();
    dispatch(setBigBusinessList({ id: currentUser.id, business: { ...values, id } }));
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
        title="Buy Big"
        styles="w-[28%] px-2"
        onPress={handleSubmit(onBuyBigBusiness)}
      />
    </RowComponent>
  );
};
