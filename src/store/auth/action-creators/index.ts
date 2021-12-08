import { Dispatch } from 'redux';
import { ActionType } from '@root/store/auth/actions-types';
import { Action } from '@root/store/auth/actions';
import { apiUri } from '@root/service/apiEndPoints';
import { LoginInterface } from '@root/interfaces/loginInterface';
import service from '@root/service/axios';

/**
 *
 * @param data
 */
export const login = (data: LoginInterface) => {
    return async (dispatch: Dispatch<Action | any>) => {
        dispatch({
            type: ActionType.LOGIN,
        });
        try {
            const response: any = await service.post(apiUri.auth.login, data);
            console.log('data: ', response);
        } catch (e: any) {
            dispatch({
                type: ActionType.LOGIN_ERROR,
                payload: e.message,
            });
        }
    };
};
