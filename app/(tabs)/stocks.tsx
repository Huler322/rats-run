import { HeaderComponent } from '@/components/header/header.component';
import { BuyStocksFormComponents } from '@/components/stocks/buy-stocks-form.components';
import { StockItemComponent } from '@/components/stocks/stock-item.component';
import { StockItemsHeaderComponent } from '@/components/stocks/stock-items-header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { useAppSelector } from '@/store';
import { View } from 'react-native';

export default function StocksScreen() {
  const { currentUser, stock } = useAppSelector(({ game }) => game);

  if (!currentUser?.id) return null;

  const currentStockList = stock ? stock[currentUser.id]?.list : [];
  console.log('currentStockList', currentStockList);
  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <BuyStocksFormComponents currentUser={currentUser} />

      {currentStockList?.length ? (
        <View>
          <StockItemsHeaderComponent />
          {currentStockList?.map((stock, key) => (
            <View key={key}>
              <StockItemComponent stock={stock} />
            </View>
          ))}
        </View>
      ) : null}
    </ContainerScrollComponent>
  );
}
