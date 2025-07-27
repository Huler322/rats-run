import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { View } from 'react-native';
import { RichBusinessListComponent } from '@/components/rich-circle/rich-business-list.component';

export default function RichCircleScreen() {
  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <View></View>
      <RichBusinessListComponent />
    </ContainerScrollComponent>
  );
}
