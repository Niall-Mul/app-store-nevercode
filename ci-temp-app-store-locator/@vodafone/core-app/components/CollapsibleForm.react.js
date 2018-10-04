/** @flow */
import * as React from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

import { colors } from '@vodafone/core-app/styles';


export interface CollapsibleFormProps {
  title: string;
  introText?: string;
  children?: any;
  isValid?: boolean;
}

export interface CollapsibleFormState {
  collapsed: boolean;
}

export default class CollapsibleForm extends React.Component<CollapsibleFormProps, CollapsibleFormState> {
  static defaultProps = {
    isValid: false,
  };

  state = {
    collapsed: true,
  };

  open() {
    if (this.state.collapsed === true) {
      this.toggle();
    }
  }

  toggle() {
    this.setState({collapsed: !this.state.collapsed});
  }

  renderIntroText() {
    return this.props.introText ? <Text style={styles.introText}>{this.props.introText}</Text> : undefined;
  }

  renderDot() {
    let icon = this.props.isValid
      ? {name: "check-circle", color: colors.blue.default}
      : {name: "fiber-manual-record", color: colors.orange.default};

    return (
      <View style={styles.dotWrapper}>
        <Icon name={icon.name} size={16} color={icon.color} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={() => this.open()} activeOpacity={1}>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.renderDot()}
          <TouchableOpacity style={styles.arrowWrapper} onPress={() => this.toggle()}>
            <Icon name="expand-more" color={colors.blue.default} />
          </TouchableOpacity>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.collapsed} duration={600}>
          {this.renderIntroText()}
          {this.props.children}
        </Collapsible>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',

    shadowColor: '#ccc',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    marginBottom: 6,

    borderRadius: 4,
    width: '100%',
    padding: 14,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 8,
    fontSize: 14,
    color: colors.blue.default,
  },
  dotWrapper: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6f0f5',
    borderRadius: 4,
    width: 22,
    height: 22,
  },
  content: {
    flex: 1,
  },
  introText: {
    fontSize: 12,
    color: colors.blue.default,
    marginTop: 16,
    marginBottom: 16,
  },
});
