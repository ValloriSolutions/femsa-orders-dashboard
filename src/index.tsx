import { GlobalStyles, borders, colors, fonts, spacing } from '@vallorisolutions/foa-design-system';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const theme = {
    borders,
    colors,
    fonts,
    spacing,
};

export type Theme = typeof theme;

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorkerRegistration.register();
