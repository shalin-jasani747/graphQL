import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import LoadMore from '../../Components/LoadMorePost';
import Post from '../../Components/Post';
import {FETCH_POST} from './PostQueries';
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

const RenderFlatList = () => {
  const {data, error, loading} = useQuery(FETCH_POST);
  const navigation = useNavigation();

  console.log(error);
  if (error) {
    return renderErrorMessage(error);
  }

  return (
    <FlatList
      data={data?.post}
      renderItem={({item}) => renderPost(item, navigation)}
      ListFooterComponent={() => (loading ? renderLoadingComponent() : null)}
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
