import { FC } from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { InputComponent } from '@/components/inputs/input.component';
import { RowComponent } from '@/components/UI/row.component';
import tw from '@/lib/tailwind';
import { AssetType, IAsset, IUser } from '@/store/types';
import { Controller } from 'react-hook-form';
import { Alert, View, Text } from 'react-native';
import { useAppDispatch } from '@/store';
import { removeAssetFromList, sellAsset, sellStocks } from '@/slices/game.slice';
import Decimal from 'decimal.js';
import { useRouter } from 'expo-router';
import { useSellAsset } from '@/hooks/use-sell-asset';

export const SellAssetFormComponent: FC<IProps> = ({ asset, user }) => {
  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useSellAsset(asset);

  const { price } = watch();

  const totalCost = new Decimal(price?.length ? price : 0)
    .mul(new Decimal(asset.count ?? 0))
    .toString();

  const onSellAsset = () => {
    Alert.alert('Are you sure want to sell asset?', '', [
      {
        style: 'cancel',
        text: 'Keep',
      },
      {
        onPress: () => {
          dispatch(sellAsset({ asset, totalCost }));
          dispatch(removeAssetFromList({ user, asset }));
          navigation.back();
        },
        text: 'Sell',
      },
    ]);
  };

  return (
    <View style={tw`mb-6`}>
      <Text style={tw`text-center px-4 mb-2 text-base`}>
        {asset.type === AssetType.LAND
          ? 'Enter price per land unit'
          : `Enter new ${asset.type} price`}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputComponent
            styles="text-center text-gray-200 w-full"
            value={value}
            onChange={onChange}
            placeholder={'0'}
            error={errors.price}
            keyboardType={'number-pad'}
          />
        )}
        name="price"
        defaultValue=""
      />
      <RowComponent styles={'mb-4 text-center w-full'}>
        <Text style={tw`text-center w-full`}>It will cost {totalCost}$</Text>
      </RowComponent>

      <ButtonComponent title="Sell" onPress={handleSubmit(onSellAsset)} styles="bg-orange-500" />
    </View>
  );
};

interface IProps {
  user: IUser;
  asset: IAsset;
}
