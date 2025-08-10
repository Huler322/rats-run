import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { UserDreamInfoComponent } from '@/components/user-info/user-dream-info.component';
import { UserSpendingComponent } from '@/components/user-info/user-spending.component';
import { useAppSelector } from '@/store';
import { UserBalancesComponent } from '@/components/user-info/user-balances.component';

export default function HomeScreen() {
  const { currentUser } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <UserBalancesComponent />
      <UserSpendingComponent currentUser={currentUser} />
      <UserDreamInfoComponent currentUser={currentUser} />
    </ContainerScrollComponent>
  );
}
