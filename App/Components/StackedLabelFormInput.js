import React from 'react';
import {Item, Input, Text, Label} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Styles/FormInputStyle';

const StackedLabelFormInput = ({
  inputTitle,
  inputIcon,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
}) => (
  <Item stackedLabel style={styles.formItem}>
    <Label>
      <Text>{inputTitle}</Text>
    </Label>
    <Input
      secureTextEntry={secureTextEntry}
      value={value}
      keyboardType={keyboardType}
      style={styles.textInput}
      onChangeText={item => onChangeText(item)}
    />
  </Item>
);

StackedLabelFormInput.propTypes = {
  inputTitle: PropTypes.string,
  inputIcon: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default StackedLabelFormInput;
