import {useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Content, View, Form, Item, Input, Text} from 'native-base';
import React from 'react';
import firebase from 'react-native-firebase';
import CustomHeader from '../../Components/CustomHeader';
import ImageUpload from '../../Components/ImageUpload';
import {NUMBER_OF_FOLLOWING, NUMBER_OF_FOLLOWERS} from '../Post/FollowQueries';
import {GET_USER_INFO} from '../User/UserQueries';
import {useAuthState} from 'react-firebase-hooks/auth';
import styles from './Styles/UserScreenStyle';

const logout = navigation =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      AsyncStorage.clear().then(() => navigation.navigate('AuthStack'));
    });

const renderCustomHeader = navigation => (
  <CustomHeader
    headerTitle="User Profile"
    rightIconType="MaterialCommunityIcons"
    rightIcon="logout"
    onRightIconPress={() => logout(navigation)}
  />
);

const ProfileInformation = ({userId}) => {
  const {data: followersData} = useQuery(NUMBER_OF_FOLLOWERS, {
    variables: {userId},
  });
  const {data: followingData} = useQuery(NUMBER_OF_FOLLOWING, {
    variables: {userId},
  });
  return (
    <View>
      <Text>{`${
        followersData?.follow_aggregate?.aggregate?.count
      } Followers`}</Text>
      <Text>{`${
        followingData?.follow_aggregate?.aggregate?.count
      } Following`}</Text>
    </View>
  );
};

const renderImageUploadView = userId => (
  <View style={styles.imageUplaodView}>
    <ImageUpload
      imageViewStyle={styles.imageView}
      postImageStyle={styles.imageView}
      editButtonViewStyle={styles.editButtonView}
    />
    <ProfileInformation userId={userId} />
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

export default ({navigation}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;
  const {data} = useQuery(GET_USER_INFO, {
    variables: {userId},
  });
  console.log(data);
  return (
    <Container>
      {renderCustomHeader(navigation)}
      {renderImageUploadView(userId)}
      <Content padder>{renderUserForm()}</Content>
    </Container>
  );
};
