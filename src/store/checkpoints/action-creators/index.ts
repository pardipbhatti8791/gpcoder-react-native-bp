import { Dispatch } from 'redux';
import { ActionType } from '@root/store/checkpoints/actions-types';
import { Action } from '@root/store/checkpoints/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {
    ScannedCheckedPointsInterface,
    ShiftCheckPointsInterface,
} from '../interfaces';

/**
 * @param fn
 */
export const getShiftsCheckPointsEntries = (fn: ShiftCheckPointsInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_CHECKPOINTS_INIT,
        });

        try {
            const response = await service.get(
                apiUri.shifts.getScannedCheckPoints + fn.id + '/checkpoints',
            );
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const setScannedCheckPointsEntries = (
    fn: ScannedCheckedPointsInterface,
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_CHECKPOINTS_INIT,
        });

        try {
            console.log('Check Scanned Data ======>   ',JSON.stringify(fn.item))

            const response = await service.post(
                apiUri.shifts.scanNewShiftCheckPoint,
                fn.item,
                {
                    headers: {
                        'g-org': fn.orgID
                    }
                }
            );
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS,
                payload: response.data,
            });
            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_CHECKPOINTS_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
