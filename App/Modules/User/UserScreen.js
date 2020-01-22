import {useQuery} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Container, Thumbnail, View, Text, Button} from 'native-base';
import React from 'react';
import firebase from 'react-native-firebase';
import initials from 'initials';
import {startCase, upperCase} from 'lodash';
import CustomHeader from '../../Components/CustomHeader';
import {NUMBER_OF_FOLLOWING, NUMBER_OF_FOLLOWERS} from '../Post/FollowQueries';
import {GET_USER_INFO} from '../User/UserQueries';
import ImageThumbnail from '../../Components/ImageThumbnail';
import {useAuthState} from 'react-firebase-hooks/auth';
import Follow from '../../Components/Follow';
import UserPost from './UserPost';
import styles from './Styles/UserScreenStyle';

const logout = navigation =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      AsyncStorage.clear().then(() => navigation.navigate('AuthStack'));
    });

const renderCustomHeader = (navigation, anotherUserProfile) => (
  <CustomHeader
    noLeftIcon={!anotherUserProfile}
    leftIcon="ios-arrow-back"
    onLeftIconPress={() => navigation.goBack()}
    headerTitle="User Profile"
    rightIconType="MaterialCommunityIcons"
    noRightIcon={anotherUserProfile}
    rightIcon="logout"
    onRightIconPress={() => logout(navigation)}
  />
);

const ProfileInformation = ({user}) => {
  const {data: followersData} = useQuery(NUMBER_OF_FOLLOWERS, {
    variables: {userId: user?.id},
  });
  const {data: followingData} = useQuery(NUMBER_OF_FOLLOWING, {
    variables: {userId: user?.id},
  });
  return (
    <View style={styles.profileInfo}>
      <View style={styles.alignItemsCenter}>
        <Text>{user?.posts_aggregate?.aggregate?.count}</Text>
        <Text>Posts</Text>
      </View>
      <View style={styles.alignItemsCenter}>
        <Text>{followersData?.follow_aggregate?.aggregate?.count}</Text>
        <Text>Followers</Text>
      </View>
      <View style={styles.alignItemsCenter}>
        <Text>{followingData?.follow_aggregate?.aggregate?.count}</Text>
        <Text>Following</Text>
      </View>
    </View>
  );
};

const renderUserInfo = user => (
  <>
    <View style={styles.imageUplaodView}>
      <View style={styles.alignItemsCenter}>
        <ImageThumbnail thumbStyle={styles.userAvatarView} user={user} />
        <Text>{startCase(user?.name)}</Text>
      </View>
      <ProfileInformation user={user} />
    </View>
  </>
);

const renderEditButton = (navigation, user) => (
  <Button
    transparent
    style={styles.editProfile}
    onPress={() => navigation.navigate('EditUserScreen', {user})}>
    <Text style={styles.editText}>Edit Profile</Text>
  </Button>
);

export default ({navigation}) => {
  const [user, loading] = useAuthState(firebase.auth());
  const userId = navigation.getParam('userId', user?.uid);
  const anotherUserProfile = navigation.getParam('anotherUserProfile', false);
  const isLoggedInUser = userId === user?.uid;

  const {data} = useQuery(GET_USER_INFO, {
    variables: {userId},
  });

  if (loading) {
    return <View />;
  }

  return (
    <Container>
      {renderCustomHeader(navigation, anotherUserProfile)}
      {renderUserInfo(data?.user[0])}
      {isLoggedInUser && renderEditButton(navigation, data?.user[0])}
      {!isLoggedInUser && anotherUserProfile && <Follow postUserId={userId} />}
      <UserPost disableNavigation={true} userId={userId} />
    </Container>
  );
};
