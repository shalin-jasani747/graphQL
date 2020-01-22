import React, {useState, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Item, Icon, ActionSheet} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {isNull} from 'lodash';
import {uploadImageToFirebase} from '../Services/Firebase';
import styles from './Styles/ImageUploadStyle';

const options = {
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  allowsEditing: true,
  noData: true,
  storageOptions: {
    skipBackup: true,
    path: 'postPhotos',
    cameraRoll: true,
    waitUntilSaved: true,
  },
};

var BUTTONS = [
  'Take Picture',
  'Open Phone Library',
  'Delete Picture',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

const takePostPicture = (setPostPicture, setUploadingImage) => {
  ImagePicker.launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      setUploadingImage(true);
      uploadImageToFirebase(response?.uri, 'post_images').then(firebaseUrl => {
        setPostPicture(firebaseUrl);
        setUploadingImage(false);
      });
    }
  });
};

const openPhoneLibrary = (setPostPicture, setUploadingImage) => {
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      setUploadingImage(true);
      uploadImageToFirebase(response?.uri, 'post_images').then(firebaseUrl => {
        setPostPicture(firebaseUrl);
        setUploadingImage(false);
      });
    }
  });
};

const deletePostPicture = setPostPicture => setPostPicture(null);

const executeFunctions = (buttonIndex, setPostPicture, setUploadingImage) => {
  switch (buttonIndex) {
    case 0:
      takePostPicture(setPostPicture, setUploadingImage);
      break;
    case 1:
      openPhoneLibrary(setPostPicture, setUploadingImage);
      break;
    case 2:
      deletePostPicture(setPostPicture, setUploadingImage);
      break;
  }
};

const showActionSheet = (setPostPicture, setUploadingImage) => {
  ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      title: 'Select Post Photo',
    },
    buttonIndex =>
      executeFunctions(buttonIndex, setPostPicture, setUploadingImage),
  );
};

const renderPlaceHolderImageView = (
  setPostPicture,
  setUploadingImage,
  placeholderViewStyle,
) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => showActionSheet(setPostPicture, setUploadingImage)}>
      <Icon style={styles.addIcon} name="ios-add" />
    </TouchableOpacity>
  );
};

const renderSelectedImageView = (
  postPicture,
  setPostPicture,
  setUploadingImage,
  postImageStyle,
  editButtonViewStyle,
) => {
  return (
    <View>
      <FastImage
        style={[styles.postImage, postImageStyle]}
        source={{
          uri: postPicture,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.editButtonView, editButtonViewStyle]}
        onPress={() => showActionSheet(setPostPicture, setUploadingImage)}>
        <View style={styles.buttonView}>
          <Icon type="FontAwesome" name="camera" style={styles.font} />
          <Text style={styles.font}>Edit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const loadingView = () => (
  <View style={styles.loadingView}>
    <ActivityIndicator color="red" />
  </View>
);

export default React.forwardRef((props, ref) => {
  const [postPicture, setPostPicture] = useState(props.imageUrl);
  const [uploadingImage, setUploadingImage] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      getImageUrl: postPicture,
    };
  });

  return (
    <Item style={[styles.postImageView, props.imageViewStyle]}>
      {uploadingImage && loadingView()}
      {isNull(postPicture) &&
        renderPlaceHolderImageView(setPostPicture, setUploadingImage)}
      {!isNull(postPicture) &&
        renderSelectedImageView(
          postPicture,
          setPostPicture,
          setUploadingImage,
          props.postImageStyle,
          props.editButtonViewStyle,
        )}
    </Item>
  );
});
