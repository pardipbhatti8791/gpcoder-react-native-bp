import { Dispatch } from 'redux';
import { ActionType } from '@root/store/shift-reports/actions-types';
import { Action } from '@root/store/shift-reports/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { ShiftReportsInterface } from '../interfaces';

/**
 * @param fn
 */
export const getShiftsReportsEntries = (fn: ShiftReportsInterface) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SHIFT_REPORT_INIT,
        });
        try {
            const response = await service.get(
                apiUri.shifts.getShiftReports + fn.id + '/reports',
            );
            dispatch({
                type: ActionType.SHIFT_REPORT_GET_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.SHIFT_REPORT_GET_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
