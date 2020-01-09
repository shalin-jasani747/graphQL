import {useQuery} from '@apollo/react-hooks';
import React from 'react';
import {FlatList, View, Text, ActivityIndicator} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {Container} from 'native-base';
import CustomHeader from '../../Components/CustomHeader';
import Post from '../../Components/Post';
import {GET_POST} from './PostQueries';
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

const renderErrorMessage = () => (
  <View style={styles.emptyComponent}>
    <Text>Error while fetching the posts!</Text>
  </View>
);

const RenderFlatList = () => {
  const {data, error, loading} = useQuery(GET_POST);
  const navigation = useNavigation();
  if (error) {
    return renderErrorMessage();
  }

  return (
    <FlatList
      data={data?.post}
      renderItem={({item}) => renderPost(item, navigation)}
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
