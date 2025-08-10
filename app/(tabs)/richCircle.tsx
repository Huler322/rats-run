import { HeaderComponent } from '@/components/header/header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { RichBusinessListComponent } from '@/components/rich-circle/rich-business-list.component';
import { RichActionButtons } from '@/components/rich-circle/rich-action-buttons';
import { RichAddBusinessForm } from '@/components/rich-circle/rich-add-bussiness-form';
import { useAppSelector } from '@/store';
import { getTotalSalary } from '@/helpers/balance-helper';
import Decimal from 'decimal.js';
import { Text, View } from 'react-native';
import { ContainerComponent } from '@/components/templates/container.component';
import tw from '@/lib/tailwind';

export default function RichCircleScreen() {
  const { currentUser, poorCircle, richCircle } = useAppSelector(({ game }) => game);

  if (!currentUser) return null;

  const businessList = richCircle.business[currentUser.id]?.list ?? [];

  const totalIncome = getTotalSalary(currentUser, poorCircle, richCircle);

  if (new Decimal(totalIncome).lt(50000))
    return (
      <ContainerComponent styles={'bg-red-200'}>
        <Text style={tw`text-center text-xl mb-4 mt-10 `}>
          You have only <Text style={tw`font-bold`}>$ ${totalIncome}</Text> income
        </Text>
        <Text style={tw`text-center text-xl mb-4`}>
          You need <Text style={tw`font-bold`}>$ 50 000</Text> income to open Rich Circle
        </Text>
      </ContainerComponent>
    );

  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <RichActionButtons currentUser={currentUser} />
      <RichAddBusinessForm />
      <RichBusinessListComponent list={businessList} />
    </ContainerScrollComponent>
  );
}
