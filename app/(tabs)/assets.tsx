import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { useAppSelector } from '@/store';
import { HeaderComponent } from '@/components/header/header.component';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from '@/lib/tailwind';
import { TypeNavigation } from '@/types';
import { useRouter } from 'expo-router';
import { AssetType } from '@/store/types';
import { AssetListComponent } from '@/components/asset/asset-list.component';

export default function AssetsScreen() {
  const navigation = useRouter();

  const { currentUser, assets } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const assetList = assets[currentUser.id]?.list ?? [];

  const carsList = assetList.filter((asset) => asset.type === AssetType.CAR) ?? [];
  const houseList = assetList.filter((asset) => asset.type === AssetType.HOUSE) ?? [];
  const landList = assetList.filter((asset) => asset.type === AssetType.LAND) ?? [];

  const openModalAddAsset = () => {
    navigation.navigate(TypeNavigation.ADD_ASSET_MODAL);
  };

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <TouchableOpacity
        onPress={openModalAddAsset}
        style={tw`h-14 p-1 items-center justify-center bg-orange-500 z-50`}
      >
        <Text style={tw`text-center text-base text-gray-900 font-bold`}>Add Asset</Text>
      </TouchableOpacity>
      {landList.length ? (
        <View>
          <Text style={tw`text-center mt-4 text-2xl font-semibold`}>Lands List</Text>
          <AssetListComponent list={landList} />
        </View>
      ) : null}
      {carsList.length ? (
        <View>
          <Text style={tw`text-center mt-4 text-2xl font-semibold`}>Cars List</Text>
          <AssetListComponent list={carsList} />
        </View>
      ) : null}
      {houseList.length ? (
        <View>
          <Text style={tw`text-center mt-4 text-2xl font-semibold`}>House List</Text>
          <AssetListComponent list={houseList} />
        </View>
      ) : null}
    </ContainerScrollComponent>
  );
}
