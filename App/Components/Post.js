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
import {Image} from 'react-native';
import styles from './Styles/PostStyles';

const userInfoSection = () => (
  <CardItem>
    <Left>
      <Thumbnail source={{uri: 'https://placeimg.com/320/320/any'}} />
      <Body>
        <Text>NativeBase</Text>
        <Text note>GeekyAnts</Text>
      </Body>
    </Left>
    <Right>
      <Icon
        style={styles.userFollowIcon}
        type="SimpleLineIcons"
        name="user-follow"
      />
    </Right>
  </CardItem>
);

const postImageSection = () => (
  <CardItem cardBody>
    <Image
      source={{uri: 'https://placeimg.com/640/640/any'}}
      style={styles.postImage}
    />
  </CardItem>
);

const postInfoSection = () => (
  <CardItem>
    <Left>
      <Button transparent>
        <Icon name="thumbs-up" />
        <Text>12 Likes</Text>
      </Button>
    </Left>
    <Right>
      <Text>11h ago</Text>
    </Right>
  </CardItem>
);

export default () => {
  return (
    <Card>
      {userInfoSection()}
      {postImageSection()}
      {postInfoSection()}
    </Card>
  );
};
