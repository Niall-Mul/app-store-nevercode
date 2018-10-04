/**
 * Copyright 2015-present Singlepoint. All Rights Reserved.
 *
 * @flow
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
}

const MenuNavLink = (props: Props) => (
  <NavLink exact {...props} activeClassName="active"/>
);

export default MenuNavLink;
