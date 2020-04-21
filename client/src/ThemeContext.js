import { createContext } from 'react';

const ThemeContext = createContext({
  isDark: null,
  toggleTheme: () => {},
});

export default ThemeContext;
