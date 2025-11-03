import { ContainerComponent } from '@/components/templates/container.component';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store';
import { addAsset, minusInCapital } from '@/slices/game.slice';
import tw from '@/lib/tailwind';
import { Controller } from 'react-hook-form';
import { InputComponent } from '@/components/inputs/input.component';
import { ButtonComponent } from '@/components/buttons/button.component';
import { useState } from 'react';
import { AssetType } from '@/store/types';
import { IRadioButton, RadioButton } from '@/components/buttons/radio-button.component';
import { generateNonce } from '@/helpers';
import { useBuyAsset } from '@/hooks/form/use-buy-asset';

const radioButtonsList: IRadioButton[] = [
  {
    id: 1,
    label: 'Car',
    value: 'car',
    type: AssetType.CAR,
  },
  {
    id: 2,
    label: 'House',
    value: 'house',
    type: AssetType.HOUSE,
  },
  {
    id: 3,
    label: 'Land',
    value: 'land',
    type: AssetType.LAND,
  },
  // {
  //   id: 4,
  //   label: 'Apartment',
  //   value: 'apartment',
  //   type: AssetType.APARTMENT,
  // },
];

const AddAssetModal = () => {
  const navigation = useRouter();

  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(({ game }) => game);

  const [count, setCount] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(radioButtonsList[0]);

  const {
    control,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useBuyAsset(currentUser);

  const onAddAsset = () => {
    if (!currentUser) return;
    const values = getValues();
    const generationId = generateNonce();

    dispatch(
      addAsset({
        user: currentUser,
        asset: {
          id: generationId,
          type: selectedAsset.type,
          price: values.amount,
          count,
          name: values.name,
        },
      }),
    );

    dispatch(
      minusInCapital({
        user: currentUser,
        amount: values.amount,
      }),
    );
    reset();
    navigation.back();
  };

  const plusCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  return (
    <ContainerComponent>
      <View style={tw`py-10 h-full`}>
        <Text style={tw`font-bold text-lg text-center mb-2`}>Lost money from capital</Text>
        <Text style={tw`text-center px-8 mb-4 text-base`}>
          Lost from money down the drain / buying lands & apartments & cars
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputComponent
              styles={'w-full'}
              stylesContainer={'w-full mb-6'}
              value={value}
              onChange={onChange}
              withMessage={true}
              error={errors.amount}
              placeholder={'0'}
              keyboardType={'number-pad'}
            />
          )}
          name="amount"
          defaultValue=""
        />
        {radioButtonsList.map((item) => (
          <RadioButton
            item={item}
            key={item.id}
            onSelect={setSelectedAsset}
            isSelected={selectedAsset.type === item.type}
          />
        ))}
        {selectedAsset.type === AssetType.LAND ? (
          <View style={tw`flex flex-row items-center justify-between my-4`}>
            <TouchableOpacity
              style={tw`h-20 w-20 flex items-center justify-center bg-orange-500`}
              onPress={minusCount}
            >
              <Text style={tw`text-3xl`}>-</Text>
            </TouchableOpacity>
            <View style={tw`h-20 flex items-center justify-center`}>
              <Text style={tw`text-2xl`}>{count}</Text>
            </View>
            <TouchableOpacity
              style={tw`h-20 w-20 flex items-center justify-center bg-orange-500`}
              onPress={plusCount}
            >
              <Text style={tw`text-3xl`}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputComponent
                styles={'w-full'}
                stylesContainer={'w-full mb-6'}
                value={value}
                onChange={onChange}
                error={errors.name}
                placeholder={`Description about ${selectedAsset.label}`}
              />
            )}
            name="name"
            defaultValue=""
          />
        )}
        <ButtonComponent
          styles="mt-2 w-full py-4"
          title="Add Asset"
          onPress={handleSubmit(onAddAsset)}
        />
      </View>
    </ContainerComponent>
  );
};

export default AddAssetModal;
