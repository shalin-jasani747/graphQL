import {useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import {uniq} from 'lodash';
import Post from '../../Components/Post';
import {FETCH_POST_LIST, NEW_POST_SUBSCRIPTION} from './PostQueries';
import styles from './Styles/PostListStyles';

const renderListEmptyComponent = () => (
  <View style={styles.emptyComponent}>
    <Text>No Posts!</Text>
  </View>
);

const renderPost = postId => <Post postId={postId} />;

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

const loadMore = (post, fetchMore, canLoadPost) => {
  if (!canLoadPost) {
    return;
  }
  fetchMore({
    variables: {
      offset: post.length,
    },
    updateQuery: (prev, {fetchMoreResult}) => {
      if (!fetchMoreResult) {
        return prev;
      }
      return {
        post: uniq([...prev.post, ...fetchMoreResult.post]),
      };
    },
  });
};

const fetchLatestPost = subscribeToMore => {
  subscribeToMore({
    document: NEW_POST_SUBSCRIPTION,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData?.data) {
        return prev;
      }
      const newPost = subscriptionData?.data?.post[0];
      const exists = prev?.post.find(({id}) => id === newPost.id);
      if (exists) {
        return prev;
      }

      return {
        post: uniq([newPost, ...prev?.post]),
      };
    },
  });
};

const RenderFlatList = () => {
  const [canLoadPost, setCanLoadPost] = useState(false);

  const {data, error, loading, subscribeToMore, fetchMore} = useQuery(
    FETCH_POST_LIST,
    {
      variables: {offset: 0},
    },
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  fetchLatestPost(subscribeToMore);

  if (loading) {
    renderLoadingComponent();
  }

  if (error) {
    return renderErrorMessage(error);
  }

  return (
    <FlatList
      data={data?.post}
      renderItem={({item}) => renderPost(item.id)}
      onEndReached={() => loadMore(data?.post, fetchMore, canLoadPost)}
      onEndReachedThreshold="0"
      onScrollBeginDrag={() => setCanLoadPost(true)}
      onScrollEndDrag={() => setCanLoadPost(false)}
      onMomentumScrollBegin={() => setCanLoadPost(true)}
      onMomentumScrollEnd={() => setCanLoadPost(false)}
      ListEmptyComponent={renderListEmptyComponent()}
      keyExtractor={item => `${item.id}`}
    />
  );
};
export default ({navigation}) => {
  return (
    <Container>
      {renderCustomHeader(navigation)}
      <RenderFlatList />
    </Container>
  );
};
