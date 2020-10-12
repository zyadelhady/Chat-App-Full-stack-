import React, { useContext, useEffect, useState } from 'react';
import './App.scss';
import { Layout } from './hoc/Layout/Layout';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Chatting } from './containers/Chatting/Chatting';
import { Login } from './containers/Auth/Login/Login';
import { Signup } from './containers/Auth/Signup/Signup';
import { Context } from './Context';
import { Redirect } from './containers/Redirect/Redirect';
import axios from './axios';

import ThemeContext from './ThemeContext';

function App() {
  console.log(process.env);

  const { user, setUser } = useContext(Context);
  const [isAppLoading, setIsAppLoading] = useState(false);

  const history = useHistory();

  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const getAuth = async () => {
      setIsAppLoading(true);
      try {
        const res = await axios.get('api/v1/users/me/', {
          withCredentials: true,
        });
        setUser(res.data.data.data);
        history.push('/');
        setIsAppLoading(false);
      } catch (err) {
        history.push('/login');
        setIsAppLoading(false);
      }
    };
    getAuth();
  }, [setUser, history]);

  let render = (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Redirect />
        </Route>
        <Route path="/:username">
          <Chatting />
        </Route>
      </Switch>
    </Layout>
  );

  if (!user) {
    render = (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Switch>
          <Route exact path="/">
            <Redirect />
          </Route>
          <Route path="/login">
            <Login isAppLoading={isAppLoading} />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    );
  }

  return (
    <div className={['App', isDark ? 'Dark' : 'Light'].join(' ')}>{render}</div>
  );
}

export default App;
