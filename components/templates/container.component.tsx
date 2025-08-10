import React, { FC } from 'react';

import { isAndroidPlatform } from '@/constants';
import tw from '@/lib/tailwind';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

export const ContainerComponent: FC<IProps> = ({ children, header, styles, stylesChildren }) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const offset = headerHeight + insets.top;

  return (
    <SafeAreaView
      style={tw`w-full h-full py-10 bg-gray-200 ${isAndroidPlatform ? 'pt-15' : ''} ${
        styles ?? ''
      } `}
    >
      <View style={tw`px-4`}>{header ? header : null}</View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offset}
        >
          <View style={tw`px-4 h-full ${stylesChildren ?? ''}`}>{children}</View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

interface IProps {
  children: React.ReactNode;
  styles?: string;
  header?: React.ReactNode;
  stylesChildren?: string;
}
