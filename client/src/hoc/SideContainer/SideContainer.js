import React from 'react';
import classes from './SideContainer.module.scss';

export const SideContainer = (props) => {
  return (
    <div className={classes.Container}>
      <h2 className={classes.ContainerTitle}>{props.title}</h2>
      {props.children}
    </div>
  );
};
