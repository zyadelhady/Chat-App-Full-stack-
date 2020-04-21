import React from 'react';
import classes from '../Auth.module.scss';
import { Input } from '../../../components/Input/Input';

import { Container } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from '../../../axios';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../../Context';
import { Spinner } from '../../../components/Spinner/Spinner';

export const Signup = () => {
  const { register, handleSubmit, errors } = useForm();
  const [errMsg, setErrMsg] = useState('');
  const { setUser } = useContext(Context);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('api/v1/users/signup', data, {
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
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.Auth}>
            <p className={classes.AuthHeader}> Sign up</p>

            {errMsg && <p>{errMsg}</p>}
            {errors.username && <p>Your username is required</p>}
            <Input
              type="text"
              placeholder="Your Name"
              name="username"
              refrence={register({ required: true, maxLength: 80 })}
            />
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
            {errors.passwordConfirm && <p>Your password confirm is required</p>}
            <Input
              type="password"
              placeholder="Confrim Your Password"
              refrence={register({ required: true })}
              name="passwordConfirm"
            />
            <Input type="submit" />

            <Link className={classes.Create} to="/login">
              sign in
            </Link>
          </div>
        </form>
      )}
    </Container>
  );
};
