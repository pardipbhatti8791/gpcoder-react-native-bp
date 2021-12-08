/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';

// @ts-ignore
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

import { store } from '@root/store/store';
import Routes from '@root/navigation/Routes';
import { useColorScheme } from 'react-native';
import { navigationTheme } from '@root/theme/theme';

const queryClient = new QueryClient();

const App = (props: any) => {
    const scheme: any = useColorScheme();
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    theme={
                        scheme === 'light'
                            ? navigationTheme.dark
                            : navigationTheme.light
                    }>
                    <Routes scheme={scheme} />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default App;
