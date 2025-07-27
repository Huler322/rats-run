import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Decimal from 'decimal.js';
import { I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/store';
import i18n from '@/i18n';
import { TypeNavigation } from '@/types';
import { PaperProvider } from 'react-native-paper';

Decimal.set({ toExpNeg: -78, toExpPos: 78 });

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <Stack>
              <Stack.Screen name={TypeNavigation.INDEX} options={{ headerShown: false }} />
              <Stack.Screen name={TypeNavigation.TABS} options={{ headerShown: false }} />
              <Stack.Screen name={TypeNavigation.NOT_FOUND} />
            </Stack>
            <StatusBar style="auto" />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}
