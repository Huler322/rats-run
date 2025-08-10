import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import { generateNonce } from '@/helpers';
import { useBuyStocks } from '@/hooks/form/use-buy-stocks';
import tw from '@/lib/tailwind';
import { setStockInList } from '@/slices/game.slice';
import { useAppDispatch } from '@/store';
import { IUser } from '@/store/types';
import { Controller } from 'react-hook-form';
import { View, Text } from 'react-native';
import Decimal from 'decimal.js';

export const BuyStocksFormComponents: FC<IProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useBuyStocks();

  // const values = getValues();
  //
  // const totalSpend = new Decimal(values?.count?.length ? values.count : 0)
  //   .mul(new Decimal(values?.price?.length ? values.price : 0))
  //   .toString();

  const onBuyStocks = () => {
    const values = getValues();
    const id = generateNonce();
    dispatch(setStockInList({ id: currentUser.id, stock: { ...values, id } }));
    reset();
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
                error={errors.name}
                withMessage={false}
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
                withMessage={false}
                error={errors.count}
                label={'Count'}
                keyboardType={'number-pad'}
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
                withMessage={false}
                error={errors.price}
                label={'Price'}
                keyboardType={'number-pad'}
              />
            )}
            name="price"
            defaultValue=""
          />
        </View>
      </RowComponent>
      {/*<Text>It will cost {totalSpend}</Text>*/}
      <ButtonComponent onPress={handleSubmit(onBuyStocks)} title={'Buy Stock'} />
    </View>
  );
};

interface IProps {
  currentUser: IUser;
}
