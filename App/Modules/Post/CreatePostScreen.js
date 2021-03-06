import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import PostForm from '../../Components/PostForm';

class CreatePostScreen extends Component {
  renderCustomHeader() {
    return (
      <CustomHeader
        headerTitle="Create Post"
        leftIcon="ios-arrow-back"
        onLeftIconPress={() => this.props.navigation.goBack()}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.renderCustomHeader()}
        <Content padder scrollEnabled={false}>
          <PostForm />
        </Content>
      </Container>
    );
  }
}

export default CreatePostScreen;
