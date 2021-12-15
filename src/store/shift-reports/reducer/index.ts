import produce from 'immer';
import { Action } from '@root/store/shift-reports/actions';
import { ActionType } from '@root/store/shift-reports/actions-types';

interface RepositoriesStateInterface {
    shiftReportLoading: boolean;
    error: string | null;
    shiftReportData: any;
}

const initialState = {
    shiftReportLoading: false,
    error: null,
    shiftReportData: false,
};

/**
 * @param state
 * @param action
 */
const reducer = (
    state: RepositoriesStateInterface = initialState,
    action: Action,
): RepositoriesStateInterface =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionType.SHIFT_REPORT_INIT:
                draft.shiftReportLoading = true;
                draft.error = null;
                draft.shiftReportData = false;
                return draft;
            case ActionType.SHIFT_REPORT_GET_SUCCESS:
                draft.shiftReportLoading = false;
                draft.error = null;
                draft.shiftReportData = action.payload;
                return draft;
            case ActionType.SHIFT_REPORT_GET_FAILED:
                draft.shiftReportLoading = false;
                draft.error = action.payload;
                draft.shiftReportData = false;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
