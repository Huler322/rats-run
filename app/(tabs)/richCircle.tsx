import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { View } from 'react-native';

export default function RichCircleScreen() {
  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <View></View>
    </ContainerScrollComponent>
  );
}
