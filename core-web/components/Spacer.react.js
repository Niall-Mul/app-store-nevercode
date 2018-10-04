/** @flow */

import React from 'react';


export interface SpacerProps {
  size?: 'small' | 'regular' | 'big' | 'huge';
}


const Spacer = (props: SpacerProps) => {
  // TODO: Change this to a css class
  let borderTop = '1rem'; // reguar


  if (props.size === 'small') {
    borderTop = '0.5rem';
  } else if (props.size === 'big') {
    borderTop = '2rem';
  } else if (props.size == 'huge') {
    borderTop = '4rem';
  }

  let style = {
    display: 'block',
    clear: 'both',
    borderTop: `solid ${borderTop} transparent`,
  };

  return <div style={style}></div>;
};


export default Spacer;
