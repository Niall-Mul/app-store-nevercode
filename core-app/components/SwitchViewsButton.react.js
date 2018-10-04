/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { isLandscape } from '../styles/utils/landscape';
import containers from '../styles/containers';
import colors from '../styles/colors';

interface Props {
  leftButtonAction: () => any;
  rightButtonAction: () => any;
}

interface State {
  selectedIndex: number;
}

class SwitchViewsButton extends React.Component<Props, State> {
  state = {
    selectedIndex: 1,
  };

  updateIndex = (selectedIndex: number) => {
    const { leftButtonAction, rightButtonAction } = this.props;
    this.setState({ selectedIndex });
    selectedIndex === 0 ? leftButtonAction() : rightButtonAction();
  };

  createButton = (iconName: string, index: number) => {
    return (
      <Icon
        name={iconName}
        size={28}
        iconStyle={{ lineHeight: 28 }}
        color={
          this.state.selectedIndex === index
            ? colors.white.default
            : colors.black.default
        }
        onPress={() => this.updateIndex(index)}
      />
    );
  };

  render() {
    const buttons = [
      { element: () => this.createButton('md-list', 0) },
      { element: () => this.createButton('md-pin', 1) },
    ];

    return (
      <View
        style={
          isLandscape()
            ? containers.switchViewsButtonGroupContainerLandscape
            : containers.switchViewsButtonGroupContainer
        }
      >
        <ButtonGroup
          containerStyle={containers.switchViewsButtonGroup}
          innerBorderStyle={{ color: colors.turquoise.singlepoint }}
          selectedIndex={this.state.selectedIndex}
          buttons={buttons}
          selectedButtonStyle={{
            backgroundColor: colors.turquoise.singlepoint,
          }}
          buttonStyle={{ backgroundColor: colors.white.default }}
          onPress={selectedIndex => this.updateIndex(selectedIndex)}
        />
      </View>
    );
  }
}

export default SwitchViewsButton;
