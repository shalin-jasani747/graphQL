import {useMutation, useQuery} from '@apollo/react-hooks';
import React, {useState, useRef} from 'react';
import {Button, Icon, View} from 'native-base';
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

const UnFollowUser = ({unfollowUser, setFollowed}) => (
  <Button
    transparent
    onPress={() => {
      unfollowUser();
      setFollowed(false);
    }}>
    <Icon
      type="SimpleLineIcons"
      name="user-following"
      style={styles.followIcon}
    />
  </Button>
);

const FollowUser = ({followUser, setFollowed}) => (
  <Button
    transparent
    onPress={() => {
      followUser();
      setFollowed(true);
    }}>
    <Icon type="SimpleLineIcons" name="user-follow" style={styles.followIcon} />
  </Button>
);

export default ({postUserId}) => {
  const [user] = useAuthState(firebase.auth());
  const userId = user?.uid;
  // stores if the currently logged in user has followed the user
  const [followed, setFollowed] = useState(false);

  // stores if this is the first render of component
  const firstRun = useRef(true);

  // follow user mutation
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {followingId: postUserId, userId: userId},
    refetchQueries: [
      {
        query: FETCH_FOLLWERS,
        variables: {followingId: postUserId, userId: userId},
      },
      {
        query: NUMBER_OF_FOLLOWERS,
        variables: {id: postUserId},
      },
      {
        query: NUMBER_OF_FOLLOWING,
        variables: {id: userId},
      },
    ],
  });

  // unfollow user mutation
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {followingId: postUserId, userId: userId},
    refetchQueries: [
      {
        query: FETCH_FOLLWERS,
        variables: {followingId: postUserId, userId: userId},
      },
      {
        query: NUMBER_OF_FOLLOWERS,
        variables: {id: postUserId},
      },
      {
        query: NUMBER_OF_FOLLOWING,
        variables: {id: userId},
      },
    ],
  });

  // fetch array with id if current user already follows the user or an empty array
  const {data} = useQuery(FETCH_FOLLWERS, {
    variables: {followingId: postUserId, userId: userId},
  });

  // firstRun is used to ensure that it should only run for the first time

  if (firstRun.current) {
    // if current user already follows, set followed state variable to true
    if (data?.follow.length > 0) {
      setFollowed(true);
    }

    firstRun.current = false;
  }

  const followButton = followed ? (
    <UnFollowUser unfollowUser={unfollowUser} setFollowed={setFollowed} />
  ) : (
    <FollowUser followUser={followUser} setFollowed={setFollowed} />
  );
  return <View style={styles.followView}>{followButton}</View>;
};
