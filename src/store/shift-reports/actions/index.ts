import { ActionType } from '@root/store/shift-reports/actions-types';

interface InitShiftReport {
    type: ActionType.SHIFT_REPORT_INIT;
}

interface SuccessShiftReports {
    type: ActionType.SHIFT_REPORT_GET_SUCCESS;
    payload: number;
}

interface FailedShiftReports {
    type: ActionType.SHIFT_REPORT_GET_FAILED;
    payload: string;
}

export type Action = InitShiftReport | SuccessShiftReports | FailedShiftReports;
