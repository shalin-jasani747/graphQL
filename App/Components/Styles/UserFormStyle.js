import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  imageUplaodView: {
    alignItems: 'center',
  },
  imageView: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editButtonView: {
    right: 15,
    width: 60,
  },
  blockButton: {
    marginTop: 20,
  },
  inputView: {
    marginLeft: 0,
  },
});

export default styles;
