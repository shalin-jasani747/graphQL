import {Container, Content, View} from 'native-base';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';
import ImageUpload from '../../Components/ImageUpload';
import UserForm from '../../Components/UserForm';
import styles from './Styles/EditUserScreenStyle';

const renderCustomHeader = navigation => (
  <CustomHeader
    headerTitle="Edit Profile"
    leftIconText="Cancel"
    onLeftIconPress={() => navigation.goBack()}
  />
);

export default ({navigation}) => {
  const user = navigation.getParam('user', {});
  return (
    <Container>
      {renderCustomHeader(navigation)}
      <Content padder>
        <UserForm user={user} />
      </Content>
    </Container>
  );
};
