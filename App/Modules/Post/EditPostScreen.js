import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import PostForm from '../../Components/PostForm';

class EditPostScreen extends Component {
  renderCustomHeader() {
    return (
      <CustomHeader
        headerTitle="Edit Post"
        leftIcon="ios-arrow-back"
        onLeftIconPress={() => this.props.navigation.goBack()}
      />
    );
  }

  render() {
    const post = this.props.navigation.getParam('post', {});
    return (
      <Container>
        {this.renderCustomHeader()}
        <Content padder scrollEnabled={false}>
          <PostForm post={post} />
        </Content>
      </Container>
    );
  }
}

export default EditPostScreen;
