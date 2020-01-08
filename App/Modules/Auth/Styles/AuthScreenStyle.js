import {StyleSheet} from 'react-native';
import {ApplicationStyles} from '../../../Theme';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  tabContainer: {
    flex: 0.5,
    marginTop: 40,
  },
  tabHeader: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabContent: {
    flex: 1,
  },
  inActiveTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#D5CEE7',
    borderBottomWidth: 1,
  },
  activeTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#39235A',
    borderBottomWidth: 3,
  },
  inActiveTabHeaderText: {
    fontSize: 18,
    color: '#808389',
    alignSelf: 'center',
    marginBottom: 15,
  },
  ActiveTabHeaderText: {
    fontSize: 18,
    color: '#39235A',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logo: {
    height: 220,
    width: 320,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default styles;
