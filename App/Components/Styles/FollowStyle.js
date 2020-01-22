import {StyleSheet} from 'react-native';
import {Colors} from '../../Theme';

const styles = StyleSheet.create({
  followIcon: {
    color: Colors.gray,
    fontSize: 22,
    marginLeft: 0,
    marginRight: 5,
    paddingTop: 0,
  },
  followText: {color: Colors.black, fontSize: 15},
  followButton: {
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default styles;
