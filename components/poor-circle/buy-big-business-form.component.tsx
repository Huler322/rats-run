import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { useBuyBusiness } from '@/hooks/form/use-buy-business';
import { useAppDispatch, useAppSelector } from '@/store';
import { generateNonce } from '@/helpers';
import { quitFromJob, setBigBusinessList, setSmallBusinessList } from '@/slices/game.slice';
import { IBusinessState } from '@/store/types';
import { FC } from 'react';
import Decimal from 'decimal.js';

export const BuyBigBusinessFormComponent: FC<IProps> = ({ list }) => {
  const { currentUser } = useAppSelector(({ game }) => game);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useBuyBusiness(currentUser);

  const isUserAlreadyQuiteFromJob = new Decimal(currentUser?.salary?.salary ?? 0).eq(0);

  const onBuyBigBusiness = () => {
    if (!currentUser) return;
    const values = getValues();
    const id = generateNonce();
    if (!list.length && !isUserAlreadyQuiteFromJob) {
      Alert.alert(
        'If you want to buy a big business, you need to quit your job.',
        'Do you want to quit your job and add new business?',
        [
          {
            style: 'cancel',
            text: 'Cancel',
          },
          {
            onPress: () => {
              dispatch(setBigBusinessList({ id: currentUser.id, business: { ...values, id } }));
              dispatch(quitFromJob());
              reset();
            },
            text: 'Buy',
          },
        ],
      );
      return;
    }
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
              keyboardType={'number-pad'}
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
              keyboardType={'number-pad'}
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

interface IProps {
  list: IBusinessState[];
}
