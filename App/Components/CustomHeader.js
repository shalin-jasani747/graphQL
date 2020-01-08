import React from 'react';
import {Text} from 'react-native';
import {Header, Icon, Body, Right, Title, Button, Left} from 'native-base';
import PropTypes from 'prop-types';
import styles from './Styles/CustomHeaderStyles';

const renderLeftIcon = (
  leftIconType,
  leftIcon,
  leftIconText,
  onLeftIconPress,
) => (
  <Button transparent onPress={onLeftIconPress}>
    {leftIcon && (
      <Icon type={leftIconType} name={leftIcon} style={styles.leftIcon} />
    )}
    {leftIconText && <Text style={styles.iconText}>{leftIconText}</Text>}
  </Button>
);

const renderRightIcon = (
  rightIconType,
  rightIcon,
  rightIconText,
  onRightIconPress,
) => (
  <Button transparent onPress={onRightIconPress}>
    {rightIconText && <Text style={styles.iconText}>{rightIconText}</Text>}
    {rightIcon && (
      <Icon type={rightIconType} name={rightIcon} style={styles.rightIcon} />
    )}
  </Button>
);

const CustomHeader = ({
  headerTitle,
  leftIcon,
  leftIconType,
  leftIconText,
  rightIcon,
  rightIconType,
  rightIconText,
  onLeftIconPress,
  onRightIconPress,
}) => (
  <Header>
    <Left>
      {renderLeftIcon(leftIconType, leftIcon, leftIconText, onLeftIconPress)}
    </Left>
    <Body>
      <Title>
        <Text>{headerTitle}</Text>
      </Title>
    </Body>
    <Right>
      {renderRightIcon(
        rightIconType,
        rightIcon,
        rightIconText,
        onRightIconPress,
      )}
    </Right>
  </Header>
);

CustomHeader.propTypes = {
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  headerTitle: PropTypes.string,
  leftIconType: PropTypes.string,
  leftIconText: PropTypes.string,
  rightIconText: PropTypes.string,
  rightIconType: PropTypes.string,
  onLeftIconPress: PropTypes.func,
  onRightIconPress: PropTypes.func,
};

export default CustomHeader;
