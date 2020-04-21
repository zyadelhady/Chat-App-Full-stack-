import React, { useState } from 'react';
import classes from '../Auth.module.scss';
import { Input } from '../../../components/Input/Input';
import { Button } from '../../../components/Button/Button';
import { Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from '../../../axios';

import { useHistory, Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../../Context';
import { Spinner } from '../../../components/Spinner/Spinner';

export const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(Context);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('api/v1/users/signin/', data, {
        withCredentials: true,
      });

      setUser(response.data.data);
      history.push('/');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setErrMsg(err.response.data.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      {loading || props.isAppLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.Auth}>
            <p className={classes.AuthHeader}>Log in</p>

            {errMsg && <p>{errMsg}</p>}
            {errors.email && <p>Your email is required</p>}
            <Input
              type="email"
              placeholder="Your E-mail"
              name="email"
              refrence={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.password && <p>Your password is required</p>}
            <Input
              type="password"
              placeholder="Your Password"
              refrence={register({ required: true })}
              name="password"
            />
            <Button>Submit</Button>

            <Link className={classes.Create} to="/signup">
              Create account
            </Link>
          </div>
        </form>
      )}
    </Container>
  );
};
