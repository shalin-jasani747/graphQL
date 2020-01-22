import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {useState, useRef} from 'react';
import {Button, Icon, View, Text} from 'native-base';
import firebase from 'react-native-firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {
  FETCH_FOLLWERS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  NUMBER_OF_FOLLOWING,
  NUMBER_OF_FOLLOWERS,
} from '../Modules/Post/FollowQueries';
import styles from './Styles/FollowStyle';

const UnFollowUser = ({postUserId, setFollowed}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {followingId: postUserId, userId: userId},
    refetchQueries: [
      {
        query: FETCH_FOLLWERS,
        variables: {followingId: postUserId, userId: userId},
      },
      {
        query: NUMBER_OF_FOLLOWERS,
        variables: {userId: postUserId},
      },
      {
        query: NUMBER_OF_FOLLOWING,
        variables: {userId: userId},
      },
    ],
  });
  return (
    <Button
      transparent
      style={styles.followButton}
      onPress={() => {
        unfollowUser();
        setFollowed(false);
      }}>
      <Text style={styles.followText}>Following</Text>
      {/* <Icon
        type="SimpleLineIcons"
        name="user-following"
        style={styles.followIcon}
      /> */}
    </Button>
  );
};

const FollowUser = ({postUserId, setFollowed}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {followingId: postUserId, userId: userId},
    refetchQueries: [
      {
        query: FETCH_FOLLWERS,
        variables: {followingId: postUserId, userId: userId},
      },
      {
        query: NUMBER_OF_FOLLOWERS,
        variables: {userId: postUserId},
      },
      {
        query: NUMBER_OF_FOLLOWING,
        variables: {userId: userId},
      },
    ],
  });
  return (
    <Button
      transparent
      style={styles.followButton}
      onPress={() => {
        followUser();
        setFollowed(true);
      }}>
      <Text style={styles.followText}>Follow</Text>
      {/* <Icon
        type="SimpleLineIcons"
        name="user-follow"
        style={styles.followIcon}
      /> */}
    </Button>
  );
};

export default ({postUserId}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;
  // stores if the currently logged in user has followed the user
  const [followed, setFollowed] = useState(false);

  // stores if this is the first render of component
  const firstRun = useRef(true);

  // fetch array with id if current user already follows the user or an empty array
  const {loading, error, data} = useQuery(FETCH_FOLLWERS, {
    variables: {followingId: postUserId, userId: userId},
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>`Error! ${error.message}`</Text>;
  }

  // firstRun is used to ensure that it should only run for the first time
  if (firstRun.current) {
    // if current user already follows, set followed state variable to true
    if (data?.follow.length > 0) {
      setFollowed(true);
    }
    firstRun.current = false;
  }

  const followButton = followed ? (
    <UnFollowUser postUserId={postUserId} setFollowed={setFollowed} />
  ) : (
    <FollowUser postUserId={postUserId} setFollowed={setFollowed} />
  );
  return followButton;
};
