import {useAuthState} from 'react-firebase-hooks/auth';
import React from 'react';
import firebase from 'react-native-firebase';
import {View, Text, Button} from 'react-native';
export default () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const login = () => {
    firebase.auth().signInWithEmailAndPassword('test@test.com', 'password');
  };
  const logout = () => {
    firebase.auth().signOut();
  };

  console.log(user);
  console.log(loading);
  console.log(error);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Initialising User...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  if (user) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Current User: {user.email}</Text>
        <Button title="Log out" onPress={logout} />
      </View>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={login} title="Log in" />
    </View>
  );
};
