import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors} from '../../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  imageUplaodView: {
    alignItems: 'center',
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 0.2,
  },
  imageView: {width: 120, height: 120, borderRadius: 60},
  editButtonView: {right: 28, width: 65},
  inputView: {marginLeft: 0},
});

export default styles;
