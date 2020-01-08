import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors} from '../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  postImage: {flex: 1, height: 200, width: null},
  userFollowIcon: {
    color: Colors.darkGray,
  },
});

export default styles;
