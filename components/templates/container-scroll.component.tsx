import React, { FC } from 'react';

import { isAndroidPlatform } from '@/constants';
import tw from '@/lib/tailwind';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

export const ContainerScrollComponent: FC<IProps> = ({ children, styles, header }) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const offset = headerHeight + insets.top;

  return (
    <SafeAreaView
      style={tw`w-full h-full py-10 bg-gray-200 ${isAndroidPlatform ? 'pt-15' : ''} ${
        styles ?? ''
      } relative `}
    >
      {header ? <View style={tw`px-4`}>{header}</View> : null}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}
      >
        <ScrollView style={tw`h-full px-4`}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

interface IProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  styles?: string;
  stylesChildren?: string;
}
