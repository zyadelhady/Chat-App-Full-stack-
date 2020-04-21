import React from 'react';
import classes from './Input.module.scss';

export const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      className={[classes.Input, props.className].join(' ')}
      ref={props.refrence}
    />
  );
};
