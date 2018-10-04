/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import basicStyles from '../styles/basicComponents';
import containers from '../styles/containers';
import typography from '../styles/typography';

interface Props {
  text: string;
  width: string;
  toggle: () => any;
}

interface State {
  activated: boolean;
}

class SwitchButton extends React.Component<Props, State> {
  state = {
    activated: false,
  };
  toggle = () => {
    this.setState({ activated: !this.state.activated });
    this.props.toggle();
  };
  render() {
    return (
      <View style={{ width: this.props.width, height: 90 }}>
        <Button
          title={this.props.text}
          textStyle={
            this.state.activated
              ? typography.switchButtonTextActive
              : typography.switchButtonTextGrey
          }
          buttonStyle={
            this.state.activated
              ? basicStyles.switchButtonActive
              : basicStyles.switchButtonGrey
          }
          containerStyle={{ width: 80, height: 60 }}
          onPress={this.toggle}
        />
      </View>
    );
  }
}

export default SwitchButton;
