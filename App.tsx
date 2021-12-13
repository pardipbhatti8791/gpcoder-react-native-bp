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
import { Text, useColorScheme, View } from 'react-native';

import { store } from '@root/store/store';
import Routes from '@root/navigation/Routes';
import { navigationTheme } from '@root/theme/theme';
import { getData } from '@root/storage';
import { useActions } from '@root/hooks/useActions';
import { storageConstants } from './src/storage/storage-constants';
import { setOrgIDForState } from './src/store/auth/action-creators';

const queryClient = new QueryClient();

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    const scheme: any = useColorScheme();
    const { setAuthentication, setOrgIDForState } = useActions();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getToken = async () => {
            const token = await getData(storageConstants.token);
            if (token !== null) {
                const orgID: any = await getData(storageConstants.orgID);
                if (orgID) {
                    setOrgIDForState(JSON.parse(orgID));
                    setAuthentication(true);
                }
            }

            setLoading(false);
        };

        getToken();
    }, []);
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    theme={
                        scheme === 'light'
                            ? navigationTheme.dark
                            : navigationTheme.light
                    }>
                    {loading ? (
                        <View
                            style={{
                                flex: 1,
                                backgroundColor:
                                    navigationTheme.dark.colors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: '#fff' }}>Loading</Text>
                        </View>
                    ) : (
                        <Routes scheme={scheme} />
                    )}
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default AppWrapper;
