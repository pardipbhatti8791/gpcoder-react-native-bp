export interface ShiftReportsInterface {
    id: string;
}

export interface CreateReportEntryForShiftInterface {
    url: string;
    type: string;
    create?: {
        reportTime: string;
        description: string;
        geoLocation: {
            latitude: number;
            longitude: number;
        };
        shiftID: number;
    };
    update?: {
        reportTime: string;
        description: string;
        geoLocation: {
            latitude: number;
            longitude: number;
        };
        shiftReportID: number;
    };
}

export interface ShiftReportAttachmentInterface {
    id: string;
}
