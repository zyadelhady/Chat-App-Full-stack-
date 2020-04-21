import React from 'react';
import classes from './Button.module.scss';

export const Button = (props) => {
  return (
    <button
      className={[classes.Btn, props.className].join(' ')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
