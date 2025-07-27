import React, { FC } from 'react';

import { SafeAreaView, ScrollView, View } from 'react-native';

import { isAndroidPlatform } from '@/constants';
import tw from '@/lib/tailwind';

export const ContainerScrollComponent: FC<IProps> = ({ children, styles, header }) => {
  return (
    <SafeAreaView
      style={tw`w-full h-full bg-base py-10 ${isAndroidPlatform ? 'pt-15' : ''} ${
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
