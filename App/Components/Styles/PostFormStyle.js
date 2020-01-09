import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  postImage: {height: 200, width: Metrics.screenWidth - 20},
  postImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    height: 200,
    backgroundColor: '#e9e6e6',
    borderBottomWidth: 0,
  },
  nullPostView: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    color: Colors.white,
    fontSize: 15,
  },
  blockButton: {
    marginTop: 20,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  touchable: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 30,
    width: 70,
    backgroundColor: '#000',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  captionView: {marginLeft: 0},
});

export default styles;
