import React from 'react';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import styles from './Styles/PostStyles';
import {Colors} from '../Theme';

const userInfoSection = user => (
  <CardItem>
    <Left>
      <Thumbnail source={{uri: user.avatar}} />
      <Body>
        <Text>{user.name}</Text>
      </Body>
    </Left>
    <Right>
      <Button transparent>
        <Icon
          style={styles.userFollowIcon}
          type="SimpleLineIcons"
          name="user-follow"
        />
      </Button>
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

const postInfoSection = (count, created_at) => (
  <CardItem>
    <Left>
      <Button transparent>
        <Icon
          type="FontAwesome"
          name="thumbs-o-up"
          style={{color: Colors.gray}}
        />
        <Text>{`${count} Likes`}</Text>
      </Button>
    </Left>
    <Right>
      <Text>{`${moment(created_at).fromNow()}`}</Text>
    </Right>
  </CardItem>
);

export default ({post, navigation}) => {
  const {
    caption,
    created_at,
    likes_aggregate: {
      aggregate: {count},
    },
    user,
  } = post;
  return (
    <Card>
      {userInfoSection(user)}
      {postImageSection(post, navigation)}
      {imageCaptionSection(caption)}
      {postInfoSection(count, created_at)}
    </Card>
  );
};
