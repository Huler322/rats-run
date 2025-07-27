import { ContainerComponent } from '@/components/templates/container.component';
import { UserListComponent } from '@/components/user/user-list.component';
import { UserStatus } from '@/types';
import { View, Text } from 'react-native';

const usersList = [
  {
    dream: { name: 'buy porsche', price: '1000000' },
    name: 'Tolia',
    profession: 'developer',
    salary: {
      salary: '3900',
    },
    spending: {
      apartments: '1000',
      child: '200',
      clothes: '50',
      creditApartments: { full: '0', month: '0' },
      creditCar: { full: '0', month: '0' },
      education: '0',
      food: '250',
      internet: '50',
      travel: '100',
    },
    startingCapital: '200',
    status: UserStatus.created,
  },
];

const RootScreen = () => {
  return (
    <ContainerComponent>
      <View>
        <Text>adasdas</Text>
        <UserListComponent list={usersList} />
      </View>
    </ContainerComponent>
  );
};

export default RootScreen;
