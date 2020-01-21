import {useQuery} from '@apollo/react-hooks';
import initials from 'initials';
import {startCase, upperCase} from 'lodash';
import moment from 'moment';
import {
  Body,
  Card,
  CardItem,
  Left,
  Right,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from 'react-navigation-hooks';
import Follow from './Follow';
import Like from './Like';
import {FETCH_POST} from '../Modules/Post/PostQueries';
import styles from './Styles/PostStyles';

const placeholderView = user => (
  <View style={styles.userAvatar}>
    <Text style={styles.avatarText}>{upperCase(initials(user.name))}</Text>
  </View>
);

const userInfoSection = user => (
  <CardItem>
    <Left>
      {user.avatar ? (
        <Thumbnail source={{uri: user.avatar}} />
      ) : (
        placeholderView(user)
      )}
      <Body>
        <Text>{startCase(user.name)}</Text>
      </Body>
    </Left>
    <Right>
      <Follow postUserId={user.id} />
    </Right>
  </CardItem>
);

const postImageSection = (post, navigation) => (
  <CardItem
    cardBody
    button
    activeOpacity={1}
    onPress={() => navigation.navigate('EditPostScreen', {post})}>
    <FastImage
      style={styles.postImage}
      source={{
        uri: post?.url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  </CardItem>
);

const imageCaptionSection = postCaption => (
  <CardItem>
    <Text>{postCaption}</Text>
  </CardItem>
);

const postInfoSection = (postId, created_at) => (
  <CardItem>
    <Left>
      <Like postId={postId} />
    </Left>
    <Right>
      <Text>{`${moment(created_at).fromNow()}`}</Text>
    </Right>
  </CardItem>
);

const renderErrorMessage = error => (
  <View style={styles.emptyComponent}>
    <Text>Error while fetching the posts!</Text>
  </View>
);

export default ({postId}) => {
  const navigation = useNavigation();

  const {data, error, loading} = useQuery(FETCH_POST, {
    variables: {postId},
  });

  if (loading) {
    return <View />;
  }

  if (error) {
    return renderErrorMessage(error);
  }

  const {id, caption, created_at, user} = data?.post[0];

  return (
    <Card>
      {userInfoSection(user)}
      {postImageSection(data?.post[0], navigation)}
      {imageCaptionSection(caption)}
      {postInfoSection(id, created_at)}
    </Card>
  );
};
