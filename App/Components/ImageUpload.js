import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {ActionSheet} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {isEmpty} from 'lodash';

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

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postPicture: !isEmpty(props) ? props?.post?.url : null,
    };
    this.takePostPicture = this.takePostPicture.bind(this);
    this.openPhoneLibrary = this.openPhoneLibrary.bind(this);
    this.deletePostPicture = this.deletePostPicture.bind(this);
  }

  takePostPicture() {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          postPicture: response?.uri,
        });
      }
    });
  }

  openPhoneLibrary() {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          postPicture: response?.uri,
        });
      }
    });
  }

  deletePostPicture() {
    this.setState({
      postPicture: null,
    });
  }

  executeFunctions(buttonIndex) {
    switch (buttonIndex) {
      case 0:
        this.takePostPicture();
        break;
      case 1:
        this.openPhoneLibrary();
        break;
      case 2:
        this.deletePostPicture();
        break;
    }
  }

  showActionSheet() {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Select Post Photo',
      },
      buttonIndex => this.executeFunctions(buttonIndex),
    );
  }

  render() {
    const {children, buttonStyle} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={buttonStyle}
        onPress={() => this.showActionSheet()}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default ImageUpload;
