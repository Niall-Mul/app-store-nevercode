/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import { GoogleMap } from 'react-google-maps';

interface Props {
  position: string;
  children: any;
}

class GoogleMapCustomControl extends Component<Props> {
  map: ?GoogleMap;
  controlDiv: ?HTMLDivElement;
  divIndex: number;

  static contextTypes = { [MAP]: Object };

  constructor(props: Props) {
    super(props);
    this.map = this.context[MAP];
    this.controlDiv = document.createElement('div');
    if (this.map) {
      this.map.controls[this.props.position].push(this.controlDiv);
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.controls[this.props.position].removeAt(this.divIndex);
    }
  }

  render() {
    if (this.controlDiv && this.props.children) {
      return createPortal(this.props.children, this.controlDiv);
    }
    return null;
  }
}

export default GoogleMapCustomControl;
