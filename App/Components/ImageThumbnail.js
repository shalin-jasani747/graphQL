import React from 'react';
import {View, Text} from 'react-native';
import initials from 'initials';
import {upperCase} from 'lodash';
import FastImage from 'react-native-fast-image';
import styles from './Styles/ImageThumbnailStyle';

const placeholderView = (userName, thumbStyle) => (
  <View style={[styles.userAvatar, thumbStyle]}>
    <Text style={styles.avatarText}>{upperCase(initials(userName))}</Text>
  </View>
);

const userImage = (imageUrl, thumbStyle) => (
  <FastImage
    style={[styles.postImage, thumbStyle]}
    source={{
      uri: imageUrl,
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.cover}
  />
);

export default ({user, thumbStyle}) =>
  !user?.avatar
    ? placeholderView(user?.name, thumbStyle)
    : userImage(user?.avatar, thumbStyle);
