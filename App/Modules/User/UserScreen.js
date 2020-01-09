import React, {Component} from 'react';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import Firebase from 'react-native-firebase';

import AsyncStorage from '@react-native-community/async-storage';

class UserScreen extends Component {
  logout() {
    Firebase.auth()
      .signOut()
      .then(() => {
        AsyncStorage.clear().then(() =>
          this.props.navigation.navigate('AuthStack'),
        );
      });
  }

  renderCustomHeader() {
    return (
      <CustomHeader
        headerTitle="User Profile"
        rightIconType="MaterialCommunityIcons"
        rightIcon="logout"
        onRightIconPress={() => this.logout()}
      />
    );
  }

  render() {
    return <Container>{this.renderCustomHeader()}</Container>;
  }
}

export default UserScreen;
