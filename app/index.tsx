import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { UserEmptyStateComponent } from '@/components/user/user-empty-state.component';
import { UserListComponent } from '@/components/user/user-list.component';
import { useAppSelector } from '@/store';

const RootScreen = () => {
  const { user } = useAppSelector(({ game }) => game);

  if (!user?.list?.length) return <UserEmptyStateComponent />;

  return (
    <ContainerScrollComponent>
      <UserListComponent list={user?.list} />
    </ContainerScrollComponent>
  );
};

export default RootScreen;
