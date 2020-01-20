import {StyleSheet} from 'react-native';
import {Colors} from '../../Theme';

const styles = StyleSheet.create({
  followView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  followIcon: {
    color: Colors.gray,
    fontSize: 22,
    marginLeft: 0,
    marginRight: 5,
    paddingTop: 0,
  },
  followText: {color: Colors.gray, fontSize: 15},
});

export default styles;
