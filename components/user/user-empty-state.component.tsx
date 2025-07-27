import React from 'react';

import { ButtonComponent } from '@/components/buttons/button.component';
import { isAndroidPlatform } from '@/constants';
import tw from '@/lib/tailwind';
import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';

export const UserEmptyStateComponent = () => {
  return (
    <SafeAreaView style={tw`w-full h-full bg-base py-10 ${isAndroidPlatform ? 'pt-15' : ''} `}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          source={require('../../assets/images/empty-state.png')}
          style={tw`flex-1`}
          imageStyle={tw`opacity-30`}
          resizeMode="contain"
        >
          <View style={tw`flex-1 h-full items-center justify-around`}>
            <Text style={tw`text-xl mb-4 text-center font-bold`}>No active users yet</Text>
            <ButtonComponent title={'Add New User'} />
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
