import {StyleSheet} from 'react-native';
import {Colors} from '../../Theme';

const styles = StyleSheet.create({
  likeView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  likeIcon: {
    color: Colors.summarSky,
    fontSize: 22,
    marginLeft: 0,
    marginRight: 5,
    paddingTop: 0,
  },
  likeText: {color: Colors.summarSky, fontSize: 15},
});

export default styles;
