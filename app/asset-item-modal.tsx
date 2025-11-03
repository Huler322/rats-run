import { View, Text, Alert } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { useAppDispatch, useAppSelector } from '@/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RowComponent } from '@/components/UI/row.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { removeAssetFromList } from '@/slices/game.slice';
import { SellAssetFormComponent } from '@/components/asset/sell-asset-form.component';

const AssetItemModal = () => {
  const navigation = useRouter();

  const { id } = useLocalSearchParams();

  const dispatch = useAppDispatch();

  const { currentUser, assets } = useAppSelector(({ game }) => game);

  if (!currentUser) return <></>;

  const assetsList = assets[currentUser.id].list;

  const currentAsset = assetsList.find((stock) => stock.id === id);

  const onRemove = () => {
    if (!currentAsset) return;
    Alert.alert('Are you sure want to remove this asset?', '', [
      {
        style: 'cancel',
        text: 'Cancel',
      },
      {
        onPress: () => {
          dispatch(removeAssetFromList({ user: currentUser, asset: currentAsset }));
          navigation.back();
        },
        text: 'Remove',
      },
    ]);
  };

  if (!currentAsset) return <></>;

  return (
    <ContainerScrollComponent styles={'bg-white'}>
      <View style={tw`items-center justify-center h-full w-full py-10`}>
        <View
          style={tw`mb-12 px-3 bg-gray-800 rounded-lg overflow-hidden pt-3 border-b border-gray-600`}
        >
          <RowComponent styles="w-full mb-4 text-center">
            <Text style={tw`text-xl text-orange-500 font-medium w-[40%] text-left`}>
              Name Or Type
            </Text>
            <Text style={tw`text-base text-orange-500 font-medium w-[28%] text-center`}>Price</Text>
            <Text style={tw`text-base text-orange-500 font-medium w-[28%] text-center`}>Count</Text>
          </RowComponent>
          <RowComponent styles="w-full mb-4 text-center">
            <Text style={tw`text-xl text-white font-medium w-[40%] text-left`}>
              {currentAsset.name?.length ? currentAsset.name : currentAsset.type}
            </Text>
            <Text style={tw`text-base text-white font-medium w-[28%] text-center`}>
              $ {currentAsset.price}
            </Text>
            <Text style={tw`text-base text-white font-medium w-[28%] text-center`}>
              {currentAsset.count}
            </Text>
          </RowComponent>
        </View>

        <SellAssetFormComponent asset={currentAsset} user={currentUser} />

        <ButtonComponent title="Remove" onPress={onRemove} styles="bg-red-500 w-full mt-10" />
      </View>
    </ContainerScrollComponent>
  );
};

export default AssetItemModal;
