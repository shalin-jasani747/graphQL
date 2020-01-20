import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {Text, Button, Icon, View} from 'native-base';
import firebase from 'react-native-firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {FETCH_LIKES, LIKE_POST, UNLIKE_POST} from '../Modules/Post/LikeQueries';
import styles from './Styles/LikeStyle';

const UnLikePost = ({deleteLike, setLiked, setCountLikes, countLikes}) => (
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

const LikePost = ({likePost, setLiked, setCountLikes, countLikes}) => (
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

export default ({postId}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;

  const [liked, setLiked] = useState(false);
  // stores the number of likes
  const [countLikes, setCountLikes] = useState(-1);

  // like post mutation
  const [likePost] = useMutation(LIKE_POST, {
    variables: {postId, userId},
    refetchQueries: [
      {
        query: FETCH_LIKES,
        variables: {postId, userId},
      },
    ],
  });

  // delete post mutation
  const [deleteLike] = useMutation(UNLIKE_POST, {
    variables: {postId: postId, userId: userId},
    refetchQueries: [
      {
        query: FETCH_LIKES,
        variables: {postId, userId},
      },
    ],
  });

  // fetch number of likes and array with like_id if user has already liked the post or an empty array
  const {data} = useQuery(FETCH_LIKES, {
    variables: {postId, userId},
  });

  if (countLikes === -1) {
    // if the user has already liked the post, we know that data has loaded now so we can reference data.Post
    if (data?.post[0]?.likes.length > 0) {
      setLiked(true);
    }

    // store value of number of likes in state, we are putting check conditions to prevent infinite loops
    setCountLikes(data?.post[0]?.likes_aggregate?.aggregate?.count);
  }

  const likeButton = liked ? (
    <UnLikePost
      deleteLike={deleteLike}
      setLiked={setLiked}
      setCountLikes={setCountLikes}
      countLikes={countLikes}
    />
  ) : (
    <LikePost
      likePost={likePost}
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
