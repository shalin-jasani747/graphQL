import {StyleSheet} from 'react-native';
import {ApplicationStyles} from '../../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  emptyComponent: {alignItems: 'center', marginTop: 10},
  flatList: {paddingHorizontal: 5},
});

export default styles;
