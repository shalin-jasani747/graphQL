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
  noLeftIcon,
  leftIcon,
  leftIconType,
  leftIconText,
  rightIcon,
  noRightIcon,
  rightIconType,
  rightIconText,
  onLeftIconPress,
  onRightIconPress,
}) => (
  <Header>
    <Left>
      {noLeftIcon
        ? null
        : renderLeftIcon(leftIconType, leftIcon, leftIconText, onLeftIconPress)}
    </Left>
    <Body>
      <Title>
        <Text>{headerTitle}</Text>
      </Title>
    </Body>
    <Right>
      {noRightIcon
        ? null
        : renderRightIcon(
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
  noLeftIcon: PropTypes.bool,
  rightIcon: PropTypes.string,
  noRightIcon: PropTypes.bool,
  headerTitle: PropTypes.string,
  leftIconType: PropTypes.string,
  leftIconText: PropTypes.string,
  rightIconText: PropTypes.string,
  rightIconType: PropTypes.string,
  onLeftIconPress: PropTypes.func,
  onRightIconPress: PropTypes.func,
};

export default CustomHeader;
