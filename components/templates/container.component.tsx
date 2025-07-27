import React, { FC } from 'react';

import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { isAndroidPlatform } from '@/constants';
import tw from '@/lib/tailwind';

export const ContainerComponent: FC<IProps> = ({ children, header, styles, stylesChildren }) => {
  return (
    <SafeAreaView
      style={tw`w-full h-full bg-base py-10 bg-gray-200 ${isAndroidPlatform ? 'pt-15' : ''} ${
        styles ?? ''
      } `}
    >
      <View style={tw`px-4`}>{header ? header : null}</View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={tw`px-8 h-full ${stylesChildren ?? ''}`}>{children}</View>
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
