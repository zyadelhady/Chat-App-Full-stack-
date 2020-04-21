import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = (props) => {
  const isDarkLS = localStorage.getItem('isDark');

  const [isDark, setIsDark] = useState(isDarkLS ? JSON.parse(isDarkLS) : true);

  const toggleTheme = () =>
    setIsDark((prev) => {
      localStorage.setItem('isDark', JSON.stringify(!prev));
      return !prev;
    });

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
