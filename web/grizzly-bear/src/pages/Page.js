/**
 * Copyright 2018-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import * as React from 'react';
import { Container } from 'semantic-ui-react';


interface PageProps {
  children?: any;
  bodyClassName: string;
  className: string;
  textAlign: '' | 'left' | 'center' | 'right';
}


export default class Page extends React.Component<PageProps> {
  static defaultProps: PageProps = {
    bodyClassName: 'boi',
    className: 'SP-InsurancePage',
    textAlign:  '',
  };

  componentWillMount() {
    if (document && document.body) {
      (document.body: any).className = this.props.bodyClassName;
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <Container textAlign={this.props.textAlign}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
