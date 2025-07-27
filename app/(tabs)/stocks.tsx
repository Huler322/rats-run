import { HeaderComponent } from '@/components/header/header.component';
import { BuyStocksFormComponents } from '@/components/stocks/buy-stocks-form.components';
import { StockItemComponent } from '@/components/stocks/stock-item.component';
import { StockItemsHeaderComponent } from '@/components/stocks/stock-items-header.component';
import { ContainerScrollComponent } from '@/components/templates/container-scroll.component';
import { View } from 'react-native';

const stocks = [
  { count: '15', name: 'GDV', price: '10' },
  { count: '15', name: 'GDV', price: '10' },
];

export default function StocksScreen() {
  return (
    <ContainerScrollComponent styles={'bg-white'} header={<HeaderComponent />}>
      <BuyStocksFormComponents />

      {stocks.length ? (
        <View>
          <StockItemsHeaderComponent />
          {stocks.map((stock, key) => (
            <View key={key}>
              <StockItemComponent stock={stock} />
            </View>
          ))}
        </View>
      ) : null}
    </ContainerScrollComponent>
  );
}
