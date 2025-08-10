import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { useAppSelector } from '@/store';
import { BuySmallBusinessFormComponent } from '@/components/poor-circle/buy-small-business-form.component';
import { BuyBigBusinessFormComponent } from '@/components/poor-circle/buy-big-business-form.component';
import { BigBusinessListComponent } from '@/components/poor-circle/big-business-list.component';
import { SmallBusinessListComponent } from '@/components/poor-circle/small-business-list.component';
import { HeaderComponent } from '@/components/header/header.component';
import { View } from 'react-native';
import tw from '@/lib/tailwind';

export default function PoorCircleScreen() {
  const { currentUser, poorCircle } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const smallBusinessList = poorCircle.smallBusiness[currentUser.id]?.list ?? [];
  const bigBusinessList = poorCircle.bigBusiness[currentUser.id]?.list ?? [];

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <View style={tw`pb-40`}>
        {smallBusinessList?.length < 10 ? (
          <BuySmallBusinessFormComponent list={smallBusinessList} />
        ) : null}
        {bigBusinessList?.length < 7 ? (
          <BuyBigBusinessFormComponent list={bigBusinessList} />
        ) : null}
        <SmallBusinessListComponent list={smallBusinessList} />
        <BigBusinessListComponent list={bigBusinessList} />
      </View>
    </ContainerScrollComponent>
  );
}
