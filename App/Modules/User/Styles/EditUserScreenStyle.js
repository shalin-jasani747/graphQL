import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors} from '../../../Theme';

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
  inputView: {
    marginLeft: 0,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  editProfile: {
    borderWidth: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
  },
  editText: {
    color: Colors.black,
  },
  userAvatarView: {
    marginBottom: 10,
  },
  userAvatar: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
