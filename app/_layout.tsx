import i18n from '@/i18n';
import { persistor, store } from '@/store';
import { TypeNavigation } from '@/types';
import Decimal from 'decimal.js';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

Decimal.set({ toExpNeg: -78, toExpPos: 78 });

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack>
            <Stack.Screen name={TypeNavigation.INDEX} options={{ headerShown: false }} />

            <Stack.Screen
              name={TypeNavigation.CREATE_OR_EDIT_USER}
              options={{ headerShown: false }}
            />

            <Stack.Screen name={TypeNavigation.TABS} options={{ headerShown: false }} />

            <Stack.Screen name={TypeNavigation.NOT_FOUND} />
          </Stack>
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}
