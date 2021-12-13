import { Dispatch } from 'redux';
import { ActionType } from '@root/store/auth/actions-types';
import { Action } from '@root/store/auth/actions';
import { apiUri } from '@root/service/apiEndPoints';
import { LoginInterface } from '@root/interfaces/loginInterface';
import service from '@root/service/axios';
import { storeData } from 'storage';
import { storageConstants } from '../../../storage/storage-constants';
import { CommonInterface } from '../interfaces';

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
            const response = await service.post(apiUri.auth.login, data);
            await storeData(storageConstants.token, response.data.accessToken);
            dispatch({
                type: ActionType.LOGIN_SUCCESS,
                payload: {
                    userName: response.data.userName,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                },
            });

            dispatch(setOrgID(`Bearer ${response.data.accessToken}`));

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.LOGIN_ERROR,
                payload: 'Invalid email/password',
            });
        }
    };
};

/**
 * @param value
 */
export const setAuthentication = (value: boolean) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_AUTHENTICATION,
            payload: value,
        });
    };
};

/**
 * @param token
 */
export const setOrgID = (token: string) => {
    return async (dispatch: Dispatch<Action | any>) => {
        try {
            const response = await service.get(apiUri.shifts.getOrgID, {
                headers: {
                    Authorization: token,
                },
            });
            await storeData(
                storageConstants.orgID,
                response.data.orgs[0].orgID,
            );
            dispatch(setOrgIDForState(response.data.orgs[0].orgID));
            dispatch({
                type: ActionType.SET_AUTHENTICATION,
                payload: true,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.LOGIN_ERROR,
                payload: 'Something went wrong',
            });
        }
    };
};

/**
 * @param id
 */
export const setOrgIDForState = (id: number) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SET_ORG_ID,
            payload: id,
        });
    };
};
