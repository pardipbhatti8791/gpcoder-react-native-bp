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

export interface EndShiftInterface {
    orgID: string;
    item: {
        geoLocation: {
            latitude: number;
            longitude: number;
        };
    };
}

export interface StartShiftInterface {
    type: string;
    orgID: string;
    startAuto?: {
        rosterID: string;
        geoLocation: {
            latitude: number;
            longitude: number;
        };
    };
    startManual?: {
        startTime: string;
        endTime: string;
        guardNotes: string;
        geoLocation: {
            latitude: number;
            longitude: number;
        };
    };
}
