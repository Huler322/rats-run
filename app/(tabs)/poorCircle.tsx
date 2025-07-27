import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { useAppSelector } from '@/store';
import { View } from 'react-native';

export default function PoorCircleScreen() {
  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <View></View>
    </ContainerScrollComponent>
  );
}
