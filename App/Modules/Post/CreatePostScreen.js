import React, {Component} from 'react';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';

class PostListingScreen extends Component {
  render() {
    return (
      <Container>
        <CustomHeader
          headerTitle="Create Post"
          leftIcon="ios-arrow-back"
          onLeftIconPress={() => this.props.navigation.goBack()}
        />
      </Container>
    );
  }
}

export default PostListingScreen;
