import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {startCase} from 'lodash';
import AuthForm from '../../Components/AuthForm';
import {watchAuthStateChange} from '../../Services/Firebase';
import {Images} from '../../Theme';
import styles from './Styles/AuthScreenStyle';

class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe;
    this.state = {
      authType: 'logIn',
    };
  }

  async componentDidMount() {
    this.unsubscribe = await watchAuthStateChange();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  switchTabs = authType => {
    this.setState({
      authType,
    });
  };

  renderLogo() {
    return <Image source={Images.logo} style={styles.logo} />;
  }

  renderTab(tabHeader, authType) {
    const tabStyle =
      authType === tabHeader ? styles.activeTab : styles.inActiveTab;
    const textStyle =
      authType === tabHeader
        ? styles.ActiveTabHeaderText
        : styles.inActiveTabHeaderText;
    return (
      <TouchableOpacity
        style={tabStyle}
        onPress={() => this.switchTabs(tabHeader)}>
        <Text style={textStyle}>{startCase(tabHeader)}</Text>
      </TouchableOpacity>
    );
  }

  renderTabsBar() {
    const {authType} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tabHeader}>
          {this.renderTab('logIn', authType)}
          {this.renderTab('signUp', authType)}
        </View>
        <View style={styles.tabContent}>
          <AuthForm
            authType={authType}
            updateTab={tabHeader => this.switchTabs(tabHeader)}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        {this.renderLogo()}
        {this.renderTabsBar()}
      </KeyboardAvoidingView>
    );
  }
}

AuthScreen.propTypes = {
  doLogin: PropTypes.func,
};

export default AuthScreen;
