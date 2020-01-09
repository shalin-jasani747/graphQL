import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LaunchScreen = ({navigation}) => {
  const validateSession = async () => {
    const session = await AsyncStorage.getItem('@reactnative-graphql:session');
    if (session) {
      const {exp, token} = JSON.parse(session);
      console.log(token);
      var currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime < exp) {
        navigation.navigate('MainStack');
      } else {
        navigation.navigate('AuthStack');
      }
    } else {
      navigation.navigate('AuthStack');
    }
  };

  React.useEffect(() => {
    validateSession();
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default LaunchScreen;
