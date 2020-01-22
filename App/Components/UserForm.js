import {useMutation} from '@apollo/react-hooks';
import React, {Component, createRef} from 'react';
import {Form, Item, Input, View} from 'native-base';
import {useNavigation} from 'react-navigation-hooks';
import {isEmpty} from 'lodash';
import BlockButton from './BlockButton';
import ImageUpload from './ImageUpload';
import {
  UPDATE_USER_INFO,
  FETCH_USERS_POST_LIST,
} from '../Modules/User/UserQueries';
import styles from './Styles/UserFormStyle';

const updateUser = (update_user, userData, navigation, imageUrl) => {
  const {userId, name, email} = userData;
  const avatar = imageUrl?.current?.getImageUrl;
  update_user({
    variables: {
      userId,
      avatar,
      name,
      email,
    },
  }).then(({data: {update_user: {affected_rows}}}) => {
    if (affected_rows) {
      navigation.goBack();
    }
  });
};

function RenderSubmitButton({userData, isEditPost, imageUrl}) {
  const navigation = useNavigation();
  const [update_user] = useMutation(UPDATE_USER_INFO, {
    refetchQueries: [
      {
        query: FETCH_USERS_POST_LIST,
        variables: {offset: 0, userId: userData.userId},
      },
    ],
  });
  const newUserData = {...userData, avatar: imageUrl?.current?.getImageUrl};

  return (
    <BlockButton
      buttonTitle="Save"
      style={styles.blockButton}
      onButtonPress={() => {
        updateUser(update_user, newUserData, navigation, imageUrl);
      }}
    />
  );
}

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: !isEmpty(props) ? props?.user?.id : '',
      name: !isEmpty(props) ? props?.user?.name : '',
      email: !isEmpty(props) ? props?.user?.email : '',
    };
    this.ImageUpload = createRef();
  }

  renderImageUploadView(imageUrl) {
    return (
      <View style={styles.imageUplaodView}>
        <ImageUpload
          ref={this.ImageUpload}
          imageUrl={imageUrl}
          imageViewStyle={styles.imageView}
          postImageStyle={styles.imageView}
          editButtonViewStyle={styles.editButtonView}
        />
      </View>
    );
  }

  render() {
    const {name, email} = this.state;
    const imageUrl = this.props?.user?.avatar ? this.props?.user?.avatar : null;
    return (
      <>
        <Form>
          {this.renderImageUploadView(imageUrl)}
          <Item style={styles.inputView}>
            <Input
              value={name}
              onChangeText={value => this.setState({name: value})}
              placeholder="Name"
            />
          </Item>
          <Item style={styles.inputView}>
            <Input
              value={email}
              onChangeText={value => this.setState({email: value})}
              placeholder="Email"
            />
          </Item>
        </Form>
        <RenderSubmitButton userData={this.state} imageUrl={this.ImageUpload} />
      </>
    );
  }
}

export default UserForm;
