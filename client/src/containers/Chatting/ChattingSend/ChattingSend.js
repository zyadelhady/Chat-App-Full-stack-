import React, { useContext } from 'react';
import classes from './ChattingSend.module.scss';
import { TextareaAutosize } from '@material-ui/core';
import { Button } from '../../../components/Button/Button';
import { FiSend } from 'react-icons/fi';
import { socket } from '../../../socket';
import { Context } from '../../../Context';

export const ChattingSend = (props) => {
  const { user } = useContext(Context);
  return (
    <div className={classes.Send}>
      <TextareaAutosize
        placeholder="Type a message..."
        className={classes.SendTextarea}
        ref={props.msgRef}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            props.sendMsgHandler();
            socket.emit('stoppedTyping');
            props.msgRef.current.value = '';
          } else {
            if (e.target.value.length > 1) {
              socket.emit('typing', { name: user.username });
            } else if (e.target.value.length < 2) {
              socket.emit('stoppedTyping');
            }
          }
        }}
      />
      <Button onClick={props.sendMsgHandler} className={classes.SendBtn}>
        <FiSend />
      </Button>
    </div>
  );
};
