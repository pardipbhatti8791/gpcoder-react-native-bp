import { Dispatch } from 'redux';
import { ActionType } from '@root/store/rosters/actions-types';
import { Action } from '@root/store/rosters/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { RosterInterface } from '../interfaces';

/**
 * @param fn
 */
export const getRosters = (fn: RosterInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ROSTERS_INIT,
        });
        try {
            const response = await service.get(fn.uri);
            dispatch({
                type: ActionType.ROSTERS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.ROSTERS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
