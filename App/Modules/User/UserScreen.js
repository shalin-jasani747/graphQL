import AsyncStorage from '@react-native-community/async-storage';
import {Container, Content, View, Form, Item, Input} from 'native-base';
import React from 'react';
import Firebase from 'react-native-firebase';
import CustomHeader from '../../Components/CustomHeader';
import ImageUpload from '../../Components/ImageUpload';
import styles from './Styles/UserScreenStyle';

const logout = () =>
  Firebase.auth()
    .signOut()
    .then(() => {
      AsyncStorage.clear().then(() =>
        this.props.navigation.navigate('AuthStack'),
      );
    });

const renderCustomHeader = () => (
  <CustomHeader
    headerTitle="User Profile"
    rightIconType="MaterialCommunityIcons"
    rightIcon="logout"
    onRightIconPress={() => logout()}
  />
);

const renderImageUploadView = () => (
  <View style={styles.imageUplaodView}>
    <ImageUpload
      imageViewStyle={styles.imageView}
      postImageStyle={styles.imageView}
      editButtonViewStyle={styles.editButtonView}
    />
  </View>
);

const renderUserForm = () => (
  <Form>
    <Item style={styles.inputView}>
      <Input placeholder="Name" />
    </Item>
    <Item style={styles.inputView}>
      <Input placeholder="Email" />
    </Item>
  </Form>
);

export default () => {
  return (
    <Container>
      {renderCustomHeader()}
      {renderImageUploadView()}
      <Content padder>{renderUserForm()}</Content>
    </Container>
  );
};
