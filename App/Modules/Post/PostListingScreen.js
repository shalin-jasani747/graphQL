import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import LoadMore from '../../Components/LoadMorePost';
import Post from '../../Components/Post';
import {FETCH_POST, NEW_POST_SUBSCRIPTION} from './PostQueries';
import styles from './Styles/PostListStyles';

const renderListEmptyComponent = () => (
  <View style={styles.emptyComponent}>
    <Text>No Posts!</Text>
  </View>
);

const renderPost = (post, navigation) => (
  <Post navigation={navigation} post={post} />
);

const renderLoadingComponent = () => <ActivityIndicator />;

const renderCustomHeader = navigation => (
  <CustomHeader
    headerTitle="Post"
    rightIcon="ios-add"
    onRightIconPress={() => navigation.navigate('CreatePostScreen')}
  />
);

const renderErrorMessage = error => (
  <View style={styles.emptyComponent}>
    <Text>Error while fetching the posts!</Text>
  </View>
);

const loadMore = () => console.log('here');

const fetchLatestPost = subscribeToMore => {
  subscribeToMore({
    document: NEW_POST_SUBSCRIPTION,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const newPost = subscriptionData.data.post[0];
      const exists = prev.post.find(({id}) => id === newPost.id);
      if (exists) {
        return prev;
      }

      return Object.assign({}, prev, {
        post: [newPost, ...prev.post],
      });
    },
  });
};

const RenderFlatList = () => {
  const {subscribeToMore, data, error, loading} = useQuery(FETCH_POST);
  const navigation = useNavigation();

  fetchLatestPost(subscribeToMore);

  if (error) {
    return renderErrorMessage(error);
  }

  return (
    <FlatList
      data={data?.post}
      renderItem={({item}) => renderPost(item, navigation)}
      // ListFooterComponent={() => (loading ? renderLoadingComponent() : null)}
      onEndReached={() => loadMore()}
      onEndReachedThreshold="1"
      ListEmptyComponent={
        loading ? renderLoadingComponent() : renderListEmptyComponent()
      }
      keyExtractor={item => `${item.id}`}
    />
  );
};

const PostListingScreen = ({navigation}) => {
  return (
    <Container>
      {renderCustomHeader(navigation)}
      <RenderFlatList />
    </Container>
  );
};

export default PostListingScreen;
