import React from 'react';
import classes from './Header.module.scss';

export const Header = (props) => {
  return (
    <div className={classes.Header}>
      <img src={props.photo} alt="" className={classes.HeaderImg} />
      <p className={classes.HeaderName}>{props.name}</p>
    </div>
  );
};
