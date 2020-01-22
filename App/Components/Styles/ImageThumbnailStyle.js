import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors} from '../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  postImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  userFollowIcon: {
    color: Colors.darkGray,
  },
  userAvatar: {
    width: 56,
    height: 56,
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {},
});

export default styles;
