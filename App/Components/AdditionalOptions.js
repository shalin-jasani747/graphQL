import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, ActionSheet} from 'native-base';

var BUTTONS = ['Edit', 'Delete', 'Cancel'];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

const executeFunctions = (buttonIndex, setPostPicture, setUploadingImage) => {
  switch (buttonIndex) {
    case 0:
      break;
    case 1:
      break;
  }
};

const showActionSheet = (setPostPicture, setUploadingImage) => {
  ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      title: 'Choose Action',
    },
    buttonIndex =>
      executeFunctions(buttonIndex, setPostPicture, setUploadingImage),
  );
};

export default () => (
  <TouchableOpacity activeOpacity={1} onPress={() => showActionSheet()}>
    <Icon type="SimpleLineIcons" name="options-vertical" />
  </TouchableOpacity>
);
