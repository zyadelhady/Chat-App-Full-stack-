import React from 'react';
import classes from './ChattingSend.module.scss';
import { TextareaAutosize } from '@material-ui/core';
import { Button } from '../../../components/Button/Button';
import { FiSend } from 'react-icons/fi';

export const ChattingSend = (props) => {
  return (
    <div className={classes.Send}>
      <TextareaAutosize
        placeholder="Type a message..."
        className={classes.SendTextarea}
        value={props.msg}
        onChange={(e) => props.setMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            props.sendMsgHandler();
          }
        }}
      />
      <Button onClick={props.sendMsgHandler} className={classes.SendBtn}>
        <FiSend />
      </Button>
    </div>
  );
};
