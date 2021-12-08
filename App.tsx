/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { theme } from '@root/theme/theme';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import { store } from '@root/store/store';
import Routes from '@root/navigation/Routes';
import { useColorScheme } from 'react-native';

const queryClient = new QueryClient();

const App = () => {
    const scheme: any = useColorScheme();

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <Routes scheme={scheme} />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default App;
