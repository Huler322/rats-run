import React, { FC } from 'react';

import { isAndroidPlatform } from '@/constants';
import tw from '@/lib/tailwind';
import { SafeAreaView, ScrollView, View } from 'react-native';

export const ContainerScrollComponent: FC<IProps> = ({ children, styles, header }) => {
  return (
    <SafeAreaView
      style={tw`w-full h-full bg-base py-10 bg-gray-200 ${isAndroidPlatform ? 'pt-15' : ''} ${
        styles ?? ''
      } relative `}
    >
      {header ? <View style={tw`px-4`}>{header}</View> : null}
      <ScrollView style={tw`h-full px-4`}>{children}</ScrollView>
    </SafeAreaView>
  );
};

interface IProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  styles?: string;
  stylesChildren?: string;
}
