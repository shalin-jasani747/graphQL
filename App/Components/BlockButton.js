import React from 'react';
import {Button, Text} from 'native-base';
import PropTypes from 'prop-types';

const BlockButton = ({style, isDanger, onButtonPress, buttonTitle}) => (
  <Button
    bordered
    block
    danger={isDanger}
    style={style}
    onPress={onButtonPress}>
    <Text>{buttonTitle}</Text>
  </Button>
);

BlockButton.defaultProps = {
  isDanger: false,
};

BlockButton.propTypes = {
  style: PropTypes.object,
  isDanger: PropTypes.bool,
  buttonTitle: PropTypes.string,
  onButtonPress: PropTypes.func,
};

export default BlockButton;
