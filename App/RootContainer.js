import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import {Root} from 'native-base';

const RootContainer = () => {
  return (
    <Root>
      <StatusBar barStyle="dark-content" />
      <AppNavigation />
    </Root>
  );
};

export default RootContainer;
