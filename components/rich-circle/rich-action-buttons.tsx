import { View } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { FC } from 'react';
import { IUser } from '@/store/types';
import { useAppDispatch } from '@/store';
import { setUserDivorced, minusTax } from '@/slices/game.slice';

export const RichActionButtons: FC<IProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  if (!currentUser) return <></>;

  const handleDivorce = () => {
    dispatch(setUserDivorced(currentUser));
  };
  const handleTax = () => {
    dispatch(minusTax(currentUser));
  };

  return (
    <View style={tw`flex flex-row gap-4 items-center justify-between`}>
      {!currentUser.isDivorced && (
        <ButtonComponent styles={'w-[45%]'} title="Divorce" onPress={handleDivorce} />
      )}

      <ButtonComponent styles={'w-[45%]'} title="Tax 10%" onPress={handleTax} />
    </View>
  );
};

interface IProps {
  currentUser: IUser | null;
}
