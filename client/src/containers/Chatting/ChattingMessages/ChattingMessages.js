import React from 'react';
import classes from './ChattingMessages.module.scss';

export const ChattingMessages = (props) => {
  return (
    <div className={classes.Msgs} ref={props.msgsRef}>
      {props.children}
    </div>
  );
};
