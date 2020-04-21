import React, { useState } from 'react';
import { Context } from './Context';

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  return (
    <Context.Provider value={{ user, setUser, onlineUsers, setOnlineUsers }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
