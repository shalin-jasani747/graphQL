import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {Text, Button, Icon, View} from 'native-base';
import firebase from 'react-native-firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {FETCH_LIKES, LIKE_POST, UNLIKE_POST} from '../Modules/Post/LikeQueries';
import styles from './Styles/LikeStyle';

const UnLikePost = ({postId, setLiked, setCountLikes, countLikes}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;

  const [deleteLike] = useMutation(UNLIKE_POST, {
    variables: {postId: postId, userId: userId},
    refetchQueries: [
      {
        query: FETCH_LIKES,
        variables: {postId, userId},
      },
    ],
  });
  return (
    <Button
      transparent
      onPress={() => {
        deleteLike();
        setLiked(false);
        setCountLikes(countLikes - 1);
      }}>
      <Icon type="FontAwesome" name="thumbs-up" style={styles.likeIcon} />
    </Button>
  );
};

const LikePost = ({postId, setLiked, setCountLikes, countLikes}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;

  const [likePost] = useMutation(LIKE_POST, {
    variables: {postId, userId},
    refetchQueries: [
      {
        query: FETCH_LIKES,
        variables: {postId, userId},
      },
    ],
  });
  return (
    <Button
      transparent
      onPress={() => {
        likePost();
        setLiked(true);
        setCountLikes(countLikes + 1);
      }}>
      <Icon type="FontAwesome" name="thumbs-o-up" style={styles.likeIcon} />
    </Button>
  );
};

export default ({postId}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;

  const [liked, setLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(-1);

  const {loading, error, data} = useQuery(FETCH_LIKES, {
    variables: {postId, userId},
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>`Error! ${error.message}`</Text>;
  }

  if (countLikes === -1) {
    if (data?.post[0]?.likes.length > 0) {
      setLiked(true);
    }
    setCountLikes(data?.post[0]?.likes_aggregate?.aggregate?.count);
  }

  const likeButton = liked ? (
    <UnLikePost
      postId={postId}
      setLiked={setLiked}
      setCountLikes={setCountLikes}
      countLikes={countLikes}
    />
  ) : (
    <LikePost
      postId={postId}
      setLiked={setLiked}
      setCountLikes={setCountLikes}
      countLikes={countLikes}
    />
  );

  return (
    <View style={styles.likeView}>
      {likeButton}
      <Text style={styles.likeText}>{`${
        countLikes ? countLikes : 0
      } Likes`}</Text>
    </View>
  );
};
