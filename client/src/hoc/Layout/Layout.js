import React, { useContext } from 'react';
import classes from './Layout.module.scss';
import { Grid } from '@material-ui/core';
import { Button } from '../../components/Button/Button';
import { Messages } from '../../components/Messages/Messages';
import { FaMoon, FaRegMoon } from 'react-icons/fa';

import ThemeContext from '../../ThemeContext';

export const Layout = (props) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={classes.Layout}>
      <Grid container spacing={0}>
        <Grid
          container
          item
          xs={2}
          direction="column"
          className={classes.Right}
        >
          <Messages />
          <Button className={classes.ThemeBtn} onClick={toggleTheme}>
            {isDark ? <FaMoon /> : <FaRegMoon />} <p>Dark Mode</p>
          </Button>
        </Grid>

        <Grid item xs={10} md={10}>
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};
