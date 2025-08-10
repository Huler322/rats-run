import { Alert, View } from 'react-native';
import tw from '@/lib/tailwind';
import { ButtonComponent } from '@/components/buttons/button.component';
import { FC } from 'react';
import { IUser } from '@/store/types';
import { useAppDispatch } from '@/store';
import { minusTax } from '@/slices/game.slice';

export const RichActionButtons: FC<IProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();

  if (!currentUser) return <></>;

  const handleDivorce = () => {
    Alert.alert('Are you sure want to divorce?', 'After divorce you lost half from capital', [
      {
        style: 'Cancel',
        text: 'Cancel',
      },
      { onPress: () => dispatch(minusTax(currentUser)), text: 'Divorce' },
    ]);
  };

  const handleTax = () => {
    Alert.alert(
      'Are you sure want to pay tax?',
      'You lose 10% of your capital when you pay taxes.',
      [
        {
          style: 'Cancel',
          text: 'Cancel',
        },
        { onPress: () => dispatch(minusTax(currentUser)), text: 'Pay Tax' },
      ],
    );
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
