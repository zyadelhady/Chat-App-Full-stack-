import React from 'react';
import classes from './ChatMessage.module.scss';

export const ChatMessage = (props) => {
  const msgCreatedAt = new Date(props.createdAt);

  const time = `${msgCreatedAt.getHours()}:${msgCreatedAt.getMinutes()}`;

  let msgUrl = props.msg.replace(
    /((\w+:\/\/\S+)|(\w+[.:]\w+\S+))[^\s,.]/gi,
    (match) => `<a href=${match} target="_blank">${match}</a>`
  );

  return (
    <div
      className={[
        classes.Container,

        props.type === 'recevied'
          ? classes.Recevied
          : props.type === 'sent'
          ? classes.Sent
          : null,
      ].join(' ')}
    >
      <p
        className={classes.Msg}
        dangerouslySetInnerHTML={{
          __html: msgUrl,
        }}
      >
        {/* {msgUrl} */}
      </p>
      <p className={classes.Date}>{time}</p>
    </div>
  );
};
