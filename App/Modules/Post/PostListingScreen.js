import React from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import Post from '../../Components/Post';
import styles from './Styles/PostListStyles';

const renderListEmptyComponent = () => (
  <View style={styles.emptyComponent}>
    <Text>No Posts!</Text>
  </View>
);

const renderPost = item => <Post />;

const renderLoadingComponent = () => <ActivityIndicator />;

const renderCustomHeader = () => (
  <CustomHeader
    headerTitle="Post"
    rightIcon="ios-add"
    onRightIconPress={() => this.props.navigation.navigate('CreatePostScreen')}
  />
);

const renderFlatList = () => (
  <FlatList
    data={[{id: '1'}]}
    renderItem={({item}) => renderPost(item)}
    ListEmptyComponent={renderListEmptyComponent()}
    keyExtractor={item => item.id}
  />
);

const PostListingScreen = () => (
  <Container>
    {renderCustomHeader()}
    {renderFlatList()}
  </Container>
);

export default PostListingScreen;
