/** @flow */
import * as React from 'react';
import { TouchableOpacity, StyleSheet, Modal, View } from 'react-native';
import { FormInput, Icon } from 'react-native-elements';

import ListPopover from '../ListPopover.react';
import Field, { FieldProps, FieldState } from './Field.react';


export interface SelectFieldProps extends FieldProps {
  options: { [key: string]: string };
}

export interface SelectFieldState extends FieldState {
  isOpen: boolean;
}

export default class SelectField extends Field<SelectFieldProps> {
  input: any;

  getPlaceholder() {
    return this.props.placeholder || `Please, select ${this.props.label.toLowerCase()}`;
  }

  getItems(): string[] {
    return Object.keys(this.props.options);
  }

  getLabelByValue(value: string) {
    for(let label in this.props.options) {
      if (this.props.options[label] === value) {
        return label;
      }
    }

    return '';
  }

  onSelection(label: string) {
    let value = this.props.options[label];
    this.props.onChange(value || '');
  }

  open() {
    this.setState({isOpen: true});
    this.input.blur();
  }

  renderModal() {
    return (
      <Modal animationType="fade" transparent={true} presentationStyle="overFullScreen" visible={this.state.isOpen}>
        <View style={styles.modal}>
          <ListPopover list={this.getItems()} isVisible={true} onClick={this.onSelection.bind(this)} onClose={() => this.setState({isOpen: false})} />
        </View>
      </Modal>
    );
  }

  renderInput() {
    let label = this.getLabelByValue((this.props.value || '').toString());

    return (
      <View style={{position: 'relative'}}>
        {this.renderModal()}
        <FormInput ref={el => this.input = el} onFocus={() => this.open()} value={label} placeholder={this.getPlaceholder()} />
        <Icon name="arrow-drop-down" containerStyle={styles.carret} />
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.setState({isOpen: true})}>
        {super.render()}
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carret: {
    position: 'absolute',
    right: 24,
    bottom: 6,
  }
});
