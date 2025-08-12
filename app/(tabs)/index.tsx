import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { UserDreamInfoComponent } from '@/components/user-info/user-dream-info.component';
import { UserSpendingComponent } from '@/components/user-info/user-spending.component';
import { useAppDispatch, useAppSelector } from '@/store';
import { UserBalancesComponent } from '@/components/user-info/user-balances.component';
import { ButtonComponent } from '@/components/buttons/button.component';
import { Alert } from 'react-native';
import { setStatusOfGame } from '@/slices/game.slice';
import { UserStatus } from '@/types';

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const onEndGame = () => {
    Alert.alert('Are you winning?', '', [
      {
        style: 'cancel',
        text: 'No',
        onPress: () => {
          dispatch(setStatusOfGame({ user: currentUser, status: UserStatus.lost }));
        },
      },
      {
        onPress: () => {
          dispatch(setStatusOfGame({ user: currentUser, status: UserStatus.win }));
        },
        text: 'Yep',
      },
    ]);
  };

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <UserBalancesComponent />
      <UserSpendingComponent currentUser={currentUser} />
      <UserDreamInfoComponent currentUser={currentUser} />
      <ButtonComponent title="End Game" onPress={onEndGame} styles={'w-full mt-5 mb-40'} />
    </ContainerScrollComponent>
  );
}
