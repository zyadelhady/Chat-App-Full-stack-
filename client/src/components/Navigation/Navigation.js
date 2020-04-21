import React from 'react';
import classes from './Navigation.module.scss';
import { FiSettings, FiSearch } from 'react-icons/fi';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Navigation = () => {
  return (
    <nav className={classes.Nav}>
      {/* <div className={classes.NavSearch}>
        <button className={classes.NavSearchIcon}>
          <FiSearch />
        </button>
        <input
          type="text"
          placeholder="Search"
          className={classes.NavSearchInput}
        />
      </div> */}
      <Button>
        <FiSettings size="1.3em" />
      </Button>
    </nav>
  );
};
