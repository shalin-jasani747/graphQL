import {useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {uniq} from 'lodash';
import Post from '../../Components/Post';
import {FETCH_USERS_POST_LIST, NEW_POST_SUBSCRIPTION} from './UserQueries';
import styles from '../Post/Styles/PostListStyles';

const renderListEmptyComponent = () => (
  <View style={styles.emptyComponent}>
    <Text>No Posts!</Text>
  </View>
);

const renderPost = (postId, disableNavigation) => (
  <Post disableNavigation={disableNavigation} postId={postId} />
);

const renderLoadingComponent = () => <ActivityIndicator />;

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

const fetchLatestPost = (subscribeToMore, userId) => {
  subscribeToMore({
    document: NEW_POST_SUBSCRIPTION,
    variables: {userId},
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

const RenderFlatList = ({userId, disableNavigation}) => {
  const [canLoadPost, setCanLoadPost] = useState(false);

  const {data, error, loading, subscribeToMore, fetchMore} = useQuery(
    FETCH_USERS_POST_LIST,
    {
      variables: {offset: 0, userId},
    },
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  fetchLatestPost(subscribeToMore, userId);

  if (loading) {
    renderLoadingComponent();
  }

  if (error) {
    return renderErrorMessage(error);
  }

  return (
    <FlatList
      style={styles.flatList}
      data={data?.post}
      renderItem={({item}) => renderPost(item.id, disableNavigation)}
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
export default ({disableNavigation, userId}) => (
  <RenderFlatList disableNavigation={disableNavigation} userId={userId} />
);
