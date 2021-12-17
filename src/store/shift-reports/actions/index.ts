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

interface InitCreateReportEntry {
    type: ActionType.CREATE_PATROL_ENTRY_INIT;
}

interface SuccessCreateReportEntry {
    type: ActionType.CREATE_PATROL_ENTRY_SUCCESS;
    payload: any;
}

interface FailedCreateReportEntry {
    type: ActionType.CREATE_PATROL_ENTRY_FAILED;
    payload: string;
}

interface InitUploadAttachmentReportEntry {
    type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_INIT;
}

interface SuccessUploadAttachmentReportEntry {
    type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_SUCCESS;
    payload: any;
}

interface FailedUploadAttachmentReportEntry {
    type: ActionType.UPLOAD_ATTACHMENT_PATROL_ENTRY_FAILED;
    payload: string;
}

interface InitGetAttachmentReportEntry {
    type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_INIT;
}

interface SuccessGetAttachmentReportEntry {
    type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_SUCCESS;
    payload: any;
}

interface FailedGetAttachmentReportEntry {
    type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_FAILED;
    payload: string;
}

interface InitDeleteAttachmentReportEntry {
    type: ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_INIT;
}

interface SuccessDeleteAttachmentReportEntry {
    type: ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_SUCCESS;
    payload: any;
}

interface FailedDeleteAttachmentReportEntry {
    type: ActionType.DELETE_ATTACHMENT_PATROL_ENTRY_FAILED;
    payload: string;
}

export type Action =
    | InitShiftReport
    | SuccessShiftReports
    | FailedShiftReports
    | InitCreateReportEntry
    | SuccessCreateReportEntry
    | FailedCreateReportEntry
    | InitUploadAttachmentReportEntry
    | SuccessUploadAttachmentReportEntry
    | FailedUploadAttachmentReportEntry
    | InitGetAttachmentReportEntry
    | SuccessGetAttachmentReportEntry
    | FailedGetAttachmentReportEntry
    | InitDeleteAttachmentReportEntry
    | SuccessDeleteAttachmentReportEntry
    | FailedDeleteAttachmentReportEntry;
