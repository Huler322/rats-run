import { ButtonComponent } from '@/components/buttons/button.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';

export default function StocksScreen() {
  return (
    <ContainerScrollComponent styles={'bg-white'}>
      <ButtonComponent title="Buy Stock" />
    </ContainerScrollComponent>
  );
}
