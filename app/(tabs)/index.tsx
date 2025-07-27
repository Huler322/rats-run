import { useAppSelector } from '@/store';

export default function HomeScreen() {
  const { currentUser } = useAppSelector(({ game }) => game);
  console.log('currentUser', currentUser);

  return <></>;
}
