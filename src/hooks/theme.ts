import { useContext } from 'react';

import { ThemeContext, DefaultTheme } from 'styled-components/native';

export const useTheme = (): DefaultTheme => useContext(ThemeContext);
