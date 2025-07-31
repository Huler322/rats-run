import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { View } from 'react-native';
import { RichBusinessListComponent } from '@/components/rich-circle/rich-business-list.component';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { RichActionButtons } from '@/components/rich-circle/rich-action-buttons';
import { RichAddBussinessForm } from '@/components/rich-circle/rich-add-bussiness-form';

export default function RichCircleScreen() {
  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <RichActionButtons />
      <RichAddBussinessForm />
      <RichBusinessListComponent />
    </ContainerScrollComponent>
  );
}
