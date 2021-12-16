/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

// @ts-ignore
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useColorScheme, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@root/store/store';
import Routes from '@root/navigation/Routes';
import { navigationTheme } from '@root/theme/theme';

const queryClient = new QueryClient();

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
        console.log('Fetch', { request: { uri, options, ...args }, response });
        return response;
    });
};

const AppWrapper = () => {
    return (
        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <View style={{ flex: 1, position: "relative" }}>
                    <App />
                </View>

            </PersistGate>
        </Provider>
    );
};

const App = () => {
    const scheme: any = useColorScheme();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                theme={
                    scheme === 'light'
                        ? navigationTheme.dark
                        : navigationTheme.light
                }>
                <Routes
                    scheme={
                        scheme === 'light'
                            ? navigationTheme.dark
                            : navigationTheme.light
                    }
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AppWrapper;
