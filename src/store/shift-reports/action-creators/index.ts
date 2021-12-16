import { Dispatch } from 'redux';
import { ActionType } from '@root/store/shift-reports/actions-types';
import { Action } from '@root/store/shift-reports/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {
    CreateReportEntryForShiftInterface,
    ShiftReportsInterface,
} from '../interfaces';

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

/**
 * @param fn
 */
export const createReportEntryForShift = (
    fn: CreateReportEntryForShiftInterface,
) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CREATE_PATROL_ENTRY_INIT,
        });
        try {
            const response = await service[
                fn.type === 'create' ? 'post' : 'put'
            ](fn.url, fn.type === 'create' ? fn.create : fn.update);
            dispatch({
                type: ActionType.CREATE_PATROL_ENTRY_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.CREATE_PATROL_ENTRY_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};

/**
 * @param fn
 */
export const uploadAttachmentShiftReportsEntries = (data: FormData) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_INIT,
        });
        try {
            const response = await service.post(
                apiUri.shifts.shiftReportImageUpload,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            dispatch({
                type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_SUCCESS,
                payload: response.data,
            });

            return response;
        } catch (e: any) {
            dispatch({
                type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_FAILED,
                payload: 'Something went wrong! Please try again later',
            });
        }
    };
};
