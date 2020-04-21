import React from 'react';
import classes from './User.module.scss';
import { Link } from 'react-router-dom';
import pic from '../../assets/jeffrey_000.png';

export const User = (props) => {
  return (
    <Link to={`/${props.name}`} className={classes.Usr}>
      <div className={classes.UsrPic}>
        {props.active ? <div className={classes.UsrPicActive}></div> : null}
        <img src={pic} alt="" className={classes.UsrPic} />
      </div>
      <div className={classes.MsgUser}>
        <p className={classes.MsgUserName}>{props.name}</p>
        {props.msg ? (
          <p className={classes.MsgUserMsg}>{`${props.msg.slice(0, 5)}...`}</p>
        ) : null}
      </div>
    </Link>
  );
};
