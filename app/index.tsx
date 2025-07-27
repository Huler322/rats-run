import { UserListComponent } from '@/components/user/user-list.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { useAppSelector } from '@/store';

const RootScreen = () => {
  const { user } = useAppSelector(({ game }) => game);

  if (!user?.list?.length) return null;

  return (
    <ContainerScrollComponent>
      <UserListComponent list={user?.list} />
    </ContainerScrollComponent>
  );
};

export default RootScreen;
