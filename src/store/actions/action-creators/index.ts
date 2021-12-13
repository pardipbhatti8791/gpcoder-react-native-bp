import { Dispatch } from 'redux';
import { ActionType } from '@root/store/actions/actions-types';
import { Action } from '@root/store/actions/actions';
import { apiUri } from '@root/service/apiEndPoints';
import { LoginInterface } from '@root/interfaces/loginInterface';
import service from '@root/service/axios';
import { storeData } from 'storage';
import { ActionsInterface } from '../interfaces';

/**
 * @param fn
 */
export const getActions = (fn: ActionsInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ACTIONS_INIT,
        });
        console.log(fn)
        try {
            const response = await service.get(
                apiUri.shifts.actions,
                {
                    headers: {
                        'g-org': "1",
                    },
                },
            );
            console.log('response----', response)
            await storeData('@token', response.data.accessToken);
            dispatch({
                type: ActionType.ACTIONS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            console.log('e----', e)
            dispatch({
                type: ActionType.ACTIONS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
