/** @flow */
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { margins } from '@vodafone/core-app/styles';


interface GridProps {
  children: Grid.Row | Grid.Row[];
}

interface RowProps {
  children: Grid.Col[];
  gutter?: number;
}

interface ColProps {
  children: any;
  width?: number;
  marginRight?: number;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
  style?: any;
}

const Grid = (props: GridProps) => {
  return <View style={styles.grid}>{props.children}</View>;
};

Grid.Row = (props: RowProps) => {
  let gutter = props.gutter || 0;
  let children = React.Children.map(props.children, child => {
    return React.cloneElement(child, { marginRight: gutter });
  });

  let marginLeft = gutter * -1;

  return <View style={[styles.row, { marginLeft }]}>{children}</View>;
};

Grid.Col = (props: ColProps) => {
  let width = props.width ? `${props.width}%` : undefined;
  let marginRight = props.marginRight || 0;

  return <View style={[styles.col, { width, marginRight }, props.style]}>{props.children}</View>;
};


export default Grid;


const styles = StyleSheet.create({
  grid: {
    padding: margins.topSmall.marginTop,
  },
  row: {
    flexDirection: 'row',
    padding: 0,
  },
  col: {
    flexDirection: 'column',
    padding: 0,
  }
});
