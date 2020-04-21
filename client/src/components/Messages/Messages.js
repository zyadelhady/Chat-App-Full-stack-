import React, { useState, useEffect } from 'react';
// import classes from './Messages.module.scss';
import { User } from '../User/User';
import { SideContainer } from '../../hoc/SideContainer/SideContainer';
import { socket } from '../../socket';

export const Messages = () => {
  const [Users, setUsers] = useState({});

  useEffect(() => {
    socket.on('userLoggedIn', (Users) => {
      setUsers((prev) => {
        return { ...Users };
      });
    });

    socket.on('userLoggedOut', (Users) => {
      setUsers((prev) => {
        return { ...Users };
      });
    });
  }, []);

  return (
    <SideContainer title="Chats">
      {Object.values(Users).map((i) => {
        return (
          <User
            key={i._id}
            name={i.username}
            active={i.online ? true : false}
          />
        );
      })}
    </SideContainer>
  );
};
