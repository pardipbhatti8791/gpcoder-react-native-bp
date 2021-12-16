import produce from 'immer';
import { Action } from '@root/store/shift-reports/actions';
import { ActionType } from '@root/store/shift-reports/actions-types';

interface RepositoriesStateInterface {
    shiftReportLoading: boolean;
    error: string | null;
    shiftReportData: any;
    createReportEntryLoading: boolean;
    uploadAttachmentReportEntryLoading: boolean;
}

const initialState = {
    shiftReportLoading: false,
    error: null,
    shiftReportData: false,
    createReportEntryLoading: false,
    uploadAttachmentReportEntryLoading: false,
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
            case ActionType.CREATE_PATROL_ENTRY_INIT:
                draft.createReportEntryLoading = true;
                draft.error = null;
                return draft;

            case ActionType.CREATE_PATROL_ENTRY_SUCCESS:
                draft.createReportEntryLoading = false;
                draft.error = null;
                return draft;

            case ActionType.CREATE_PATROL_ENTRY_FAILED:
                draft.createReportEntryLoading = false;
                draft.error = action.payload;
                return draft;

            case ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_INIT:
                draft.uploadAttachmentReportEntryLoading = true;
                draft.error = null;
                return draft;

            case ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_SUCCESS:
                draft.uploadAttachmentReportEntryLoading = false;
                draft.error = null;
                return draft;

            case ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_FAILED:
                draft.uploadAttachmentReportEntryLoading = false;
                draft.error = action.payload;
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
