import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors} from '../../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  imageUplaodView: {
    marginHorizontal: 5,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButtonView: {
    right: 10,
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
    marginHorizontal: 5,
    marginBottom: 10,
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
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 40,
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
