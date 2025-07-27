import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { UserDreamInfoComponent } from '@/components/user-info/user-dream-info.component';
import { UserSpendingComponent } from '@/components/user-info/user-spending.component';
import { useAppSelector } from '@/store';

export default function HomeScreen() {
  const { currentUser } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <UserDreamInfoComponent currentUser={currentUser} />
      <UserSpendingComponent currentUser={currentUser} />
    </ContainerScrollComponent>
  );
}
