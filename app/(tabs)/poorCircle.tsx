import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { useAppSelector } from '@/store';
import { View } from 'react-native';
import { BuySmallBusinessFormComponent } from '@/components/poor-circle/buy-small-business-form.component';
import { BuyBigBusinessFormComponent } from '@/components/poor-circle/buy-big-business-form.component';
import { BigBusinessListComponent } from '@/components/poor-circle/big-business-list.component';
import { SmallBusinessListComponent } from '@/components/poor-circle/small-business-list.component';

export default function PoorCircleScreen() {
  const { currentUser, poorCircle } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const smallBusinessList = poorCircle.smallBusiness[currentUser.id]?.list ?? [];
  const bigBusinessList = poorCircle.bigBusiness[currentUser.id]?.list ?? [];

  return (
    <ContainerScrollComponent styles={'bg-white'}>
      <BuySmallBusinessFormComponent />
      <BuyBigBusinessFormComponent />
      <SmallBusinessListComponent list={smallBusinessList} />
      <BigBusinessListComponent list={bigBusinessList} />
    </ContainerScrollComponent>
  );
}
