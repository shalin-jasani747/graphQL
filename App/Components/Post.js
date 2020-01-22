import {useQuery} from '@apollo/react-hooks';
import {startCase} from 'lodash';
import moment from 'moment';
import {Body, Card, CardItem, Left, Right, Text, View} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from 'react-navigation-hooks';
import Like from './Like';
import ImageThumbnail from '../Components/ImageThumbnail';
// import AdditionalOptions from '../Components/AdditionalOptions';
import {FETCH_POST} from '../Modules/Post/PostQueries';
import styles from './Styles/PostStyles';

const userInfoSection = (navigation, user, disableNavigation) => (
  <CardItem>
    <Left>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          disableNavigation
            ? {}
            : navigation.navigate('UserProfileScreen', {
                userId: user.id,
                anotherUserProfile: true,
              })
        }>
        <ImageThumbnail user={user} />
      </TouchableOpacity>
      <Body>
        <Text>{startCase(user.name)}</Text>
      </Body>
    </Left>
    {/* <Right>
      <AdditionalOptions postUserId={user.id} />
    </Right> */}
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

export default ({postId, disableNavigation}) => {
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
      {userInfoSection(navigation, user, disableNavigation)}
      {postImageSection(data?.post[0], navigation)}
      {imageCaptionSection(caption)}
      {postInfoSection(id, created_at)}
    </Card>
  );
};
