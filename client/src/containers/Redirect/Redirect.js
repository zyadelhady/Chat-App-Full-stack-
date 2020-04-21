import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context';
import { socket } from '../../socket';

export const Redirect = () => {
  const { user } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  useEffect(() => {
    if (user) {
      socket.emit('loggedIn', { user });
    }
  }, [user]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Select User</h1>
    </div>
  );
};
