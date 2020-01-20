import React from 'react';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  View,
} from 'native-base';
import initials from 'initials';
import {upperCase, startCase} from 'lodash';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import Like from './Like';
import Follow from './Follow';
import styles from './Styles/PostStyles';

const placeholderView = user => (
  <View style={styles.userAvatar}>
    <Text style={styles.avatarText}>{upperCase(initials(user.name))}</Text>
  </View>
);

const userInfoSection = user => (
  <CardItem>
    <Left>
      {!user.avatar ? (
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

export default ({post, navigation}) => {
  const {id, caption, created_at, user} = post;
  return (
    <Card>
      {userInfoSection(user)}
      {postImageSection(post, navigation)}
      {imageCaptionSection(caption)}
      {postInfoSection(id, created_at)}
    </Card>
  );
};
