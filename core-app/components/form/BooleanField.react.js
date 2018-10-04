/** @flow */
import * as React from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import Grid from '../Grid.react';
import Field, { FieldProps, styles as FieldStyles } from './Field.react';


export interface BooleanFieldProps extends FieldProps {}

export default class BooleanField extends Field<BooleanFieldProps> {
  renderInput() {
    return <Switch value={this.props.value} onValueChange={value => this.onChangeValue(value)} disabled={this.props.disabled} />;
  }

  render() {
    return (
      <View style={FieldStyles.wrapper}>
        <Grid.Row>
          <Grid.Col width={75}>
            {this.renderLabel()}
          </Grid.Col>
          <Grid.Col width={25} style={styles.inputWrapper}>
              {this.renderInput()}
          </Grid.Col>
        </Grid.Row>
        {this.renderValidationMessage()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  inputWrapper: {
    paddingTop: 12,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
