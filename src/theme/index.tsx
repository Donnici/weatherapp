import React, { FC } from 'react';

import { DefaultTheme, ThemeProvider } from 'styled-components/native';

import { colors } from './colors';
import { fontSizes } from './sizes';

const theme: DefaultTheme = {
	colors,
	fontSizes
};

export const Theme: FC = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
