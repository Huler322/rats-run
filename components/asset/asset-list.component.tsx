import { View } from 'react-native';
import { FC } from 'react';
import { IAsset } from '@/store/types';
import { AssetItem } from '@/components/asset/asset-item.component';

export const AssetListComponent: FC<IProps> = ({ list }) => {
  return (
    <View>
      {list.map((item) => (
        <AssetItem item={item} key={item.id} />
      ))}
    </View>
  );
};
interface IProps {
  list: IAsset[];
}
