import {useMutation} from '@apollo/react-hooks';
import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Icon, ActionSheet} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {isNull, isEmpty, isUndefined} from 'lodash';
import ImagePicker from 'react-native-image-picker';
import BlockButton from './BlockButton';
import {
  INSERT_POST,
  FETCH_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../Modules/Post/PostQueries';
import styles from './Styles/PostFormStyle';

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

const updateCache = (client, {data: {insert_post, delete_post}}) => {
  let newPostData = {};
  const data = client.readQuery({
    query: FETCH_POST,
  });

  if (!isUndefined(insert_post)) {
    const newPost = insert_post.returning[0];
    newPostData = {
      post: [newPost, ...data.post],
    };
  }

  if (!isUndefined(delete_post)) {
    const deletePost = delete_post.returning[0];
    newPostData = {
      post: data.post.filter(t => t.id !== deletePost.id),
    };
  }

  client.writeQuery({
    query: FETCH_POST,
    data: newPostData,
  });
};

function createPost(insert_post, postData, navigation) {
  const {caption, postPicture} = postData;
  insert_post({
    variables: {
      caption,
      url: postPicture,
    },
    update: updateCache,
    // refetchQueries: [{query: FETCH_POST}],
  }).then(({data: {insert_post: {affected_rows}}}) => {
    if (affected_rows) {
      navigation.goBack();
    }
  });
}

const updatePost = (update_post, postData, navigation) => {
  const {id, caption, postPicture} = postData;
  update_post({
    variables: {
      id,
      caption,
      url: postPicture,
    },
  }).then(({data: {update_post: {affected_rows}}}) => {
    if (affected_rows) {
      navigation.goBack();
    }
  });
};

const deletePost = (delete_post, postData, navigation) => {
  const {id} = postData;
  delete_post({
    variables: {
      id,
    },
    update: updateCache,
  }).then(({data: {delete_post: {affected_rows}}}) => {
    if (affected_rows) {
      navigation.goBack();
    }
  });
};

function RenderSubmitButton({postData, isEditPost}) {
  const navigation = useNavigation();
  const [insert_post] = useMutation(INSERT_POST);
  const [update_post] = useMutation(UPDATE_POST);
  return (
    <BlockButton
      buttonTitle="Save"
      style={styles.blockButton}
      onButtonPress={() => {
        if (isEditPost) {
          updatePost(update_post, postData, navigation);
        } else {
          createPost(insert_post, postData, navigation);
        }
      }}
    />
  );
}

function RenderDeleteButton({postData, isEditPost}) {
  const navigation = useNavigation();
  const [delete_post] = useMutation(DELETE_POST);
  return (
    <BlockButton
      isDanger
      buttonTitle="Delete"
      style={styles.blockButton}
      onButtonPress={() => {
        deletePost(delete_post, postData, navigation);
      }}
    />
  );
}

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: !isEmpty(props) ? props?.post?.id : null,
      postPicture: !isEmpty(props) ? props?.post?.url : null,
      caption: !isEmpty(props) ? props?.post?.caption : '',
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

  renderPlaceHolderImageView() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.nullPostView}
        onPress={() => this.showActionSheet()}>
        <Icon name="ios-add" />
      </TouchableOpacity>
    );
  }

  renderSelectedImageView(postPicture) {
    return (
      <View>
        <Image source={{uri: postPicture}} style={styles.postImage} />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchable}
          onPress={() => this.showActionSheet()}>
          <View style={styles.buttonView}>
            <Icon type="FontAwesome" name="camera" style={styles.font} />
            <Text style={styles.font}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderImagView() {
    const {postPicture} = this.state;
    return (
      <Item style={styles.postImageView}>
        {isNull(postPicture) && this.renderPlaceHolderImageView()}
        {!isNull(postPicture) && this.renderSelectedImageView(postPicture)}
      </Item>
    );
  }

  renderCaptionView() {
    const {caption} = this.state;
    return (
      <Item style={styles.captionView}>
        <Input
          value={caption}
          placeholder="Caption"
          onChangeText={value => this.setState({caption: value})}
        />
      </Item>
    );
  }

  render() {
    const isEditPost = !isUndefined(this.props.post);
    return (
      <>
        <Form>
          {this.renderImagView()}
          {this.renderCaptionView()}
        </Form>
        <RenderSubmitButton postData={this.state} isEditPost={isEditPost} />
        {isEditPost && <RenderDeleteButton postData={this.state} />}
      </>
    );
  }
}

export default PostForm;
