import { Dispatch } from 'redux';
import { ActionType } from '@root/store/auth/actions-types';
import { Action } from '@root/store/auth/actions';
import { apiUri } from '@root/service/apiEndPoints';
import { LoginInterface } from '@root/interfaces/loginInterface';
import service from '@root/service/axios';
import { storeData } from 'storage';

/**
 *
 * @param data
 */
export const login = (data: LoginInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.LOGIN,
        });
        try {
            const response = await service.post(apiUri.auth.login, data);
            await storeData('@token', response.data.accessToken);
            dispatch({
                type: ActionType.LOGIN_SUCCESS,
                payload: {
                    userName: response.data.userName,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                },
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.LOGIN_ERROR,
                payload: 'Invalid email/password',
            });
        }
    };
};

export const setAuthentication = (value: boolean) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_AUTHENTICATION,
            payload: value,
        });
    };
};
