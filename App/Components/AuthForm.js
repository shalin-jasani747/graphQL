import {useMutation} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {Form} from 'native-base';
import {startCase} from 'lodash';
import BlockButton from './BlockButton';
import StackedLabelFormInput from './StackedLabelFormInput';
import {firebaseSignUp, firebaseLogin} from '../Services/Firebase';
import {REGISTER_USER} from '../Modules/Auth/AuthQueries';
import styles from './Styles/AuthFormStyles';

const doSignUp = (email, password, insert_user, navigation) => {
  firebaseSignUp(email, password).then(userId => {
    if (userId) {
      insert_user({
        variables: {
          email,
        },
      })
        .then(data => {
          navigation.navigate('MainStack');
        })
        .catch(e => {
          console.log(e.message);
        });
    }
  });
};

const doLogin = (email, password, navigation) => {
  firebaseLogin(email, password).then(userId => {
    navigation.navigate('MainStack');
  });
};

const AuthForm = ({authType, navigation}) => {
  const [insert_user] = useMutation(REGISTER_USER);
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password');
  return (
    <>
      <Form>
        <StackedLabelFormInput
          value={email}
          inputIcon="mail-outline"
          inputTitle="Email"
          keyboardType="email-address"
          onChangeText={value => setEmail(value)}
        />
        <StackedLabelFormInput
          secureTextEntry
          value={password}
          inputIcon="lock-outline"
          inputTitle="Password"
          keyboardType="default"
          onChangeText={value => setPassword(value)}
        />
      </Form>
      <BlockButton
        buttonTitle={startCase(authType)}
        style={styles.blockButton}
        onButtonPress={() =>
          authType === 'signUp'
            ? doSignUp(email, password, insert_user, navigation)
            : doLogin(email, password, navigation)
        }
      />
    </>
  );
};

export default AuthForm;
