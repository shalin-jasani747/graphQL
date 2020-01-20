import {useMutation} from '@apollo/react-hooks';
import React, {Component, createRef} from 'react';
import {Form, Item, Input} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {isEmpty, isUndefined} from 'lodash';
import BlockButton from './BlockButton';
import ImageUpload from './ImageUpload';
import {
  INSERT_POST,
  FETCH_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../Modules/Post/PostQueries';
import styles from './Styles/PostFormStyle';

const updateCache = (store, {data: {insert_post, delete_post}}) => {
  let newPostData = {};
  const data = store.readQuery({
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

  store.writeQuery({
    query: FETCH_POST,
    data: newPostData,
  });
};

function createPost(insert_post, postData, navigation) {
  const {caption, url} = postData;
  insert_post({
    variables: {
      caption,
      url,
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
  const {id, caption, url} = postData;
  update_post({
    variables: {
      id,
      caption,
      url,
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

function RenderSubmitButton({postData, isEditPost, imageUrl}) {
  const navigation = useNavigation();
  const [insert_post] = useMutation(INSERT_POST);
  const [update_post] = useMutation(UPDATE_POST);
  const newPostData = {...postData, url: imageUrl?.current?.getImageUrl};
  return (
    <BlockButton
      buttonTitle="Save"
      style={styles.blockButton}
      onButtonPress={() => {
        if (isEditPost) {
          updatePost(update_post, newPostData, navigation);
        } else {
          createPost(insert_post, newPostData, navigation);
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
      caption: !isEmpty(props) ? props?.post?.caption : '',
    };
    this.ImageUpload = createRef();
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
    const imageUrl = isEditPost ? this.props?.post?.url : null;
    return (
      <>
        <Form>
          <ImageUpload ref={this.ImageUpload} imageUrl={imageUrl} />
          {this.renderCaptionView()}
        </Form>
        <RenderSubmitButton
          postData={this.state}
          imageUrl={this.ImageUpload}
          isEditPost={isEditPost}
        />
        {isEditPost && <RenderDeleteButton postData={this.state} />}
      </>
    );
  }
}

export default PostForm;
