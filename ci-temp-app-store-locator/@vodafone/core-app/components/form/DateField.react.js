/** @flow */
import * as React from 'react';
import { Dimensions, StyleSheet, View, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { colors } from 'react-native-elements';

import TextField from './TextField.react';


export default class DateField extends TextField {
  format = `YYYY-MM-DD`;

  // onChangeValue(value: string) {
  //   value = this.formatDate(value);
  //   super.onChangeValue(value);
  // }

  getPlaceholder() {
    return this.props.placeholder || this.format;
  }

  renderInput() {
    return (
      <View style={styles.wrapper}>
        <DatePicker date={this.props.value} onDateChange={date => this.onChangeValue(date)}
          mode="date" placeholder={this.getPlaceholder()} format={this.format} confirmBtnText="Confirm"
          cancelBtnText="Cancel" showIcon={false} style={styles.input} hideText={false}
          customStyles={{ dateInput: styles.dateInput, dateText: styles.dateText }} />;
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: Platform.select({ios: 20, android: 15}),
    paddingRight: Platform.select({ios: 20, android: 15}),
  },
  input: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  dateInput: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: Platform.select({ios: colors.grey4, android: colors.grey3}),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  dateText: {
    color: colors.grey3,
  }
});
