import { log } from '@root/utils/console';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { baseURL } from '@root/service/apiEndPoints';

import { persistor, store } from '@root/store/store';
import { navigationRef } from '../navigation/RootNavigation';
import navigationStrings from '@root/navigation/navigationStrings';
import { clearAll } from '../storage';
import { ActionType } from '../store/auth/actions-types';

const state = store.getState();
const instance = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    timeoutErrorMessage: 'Timeout error'
});

export const setAuthInitalToken = (token: string) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

instance.defaults.headers.common.Authorization = `Bearer ${state.auth.accessToken}`;

instance.interceptors.response.use(
    (response) => {
        // Edit response config

        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            persistor.purge().then(async () => {
                await clearAll();
                store.dispatch({
                    type: ActionType.SET_AUTHENTICATION,
                    payload: false,
                });
                navigationRef.current.dispatch(
                    CommonActions.navigate({
                        name: navigationStrings.LOGIN,
                    }),
                );
            });
        }

        //
        return Promise.reject(error.response);
    },
);
export default instance;
