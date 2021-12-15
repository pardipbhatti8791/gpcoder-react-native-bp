export interface ShiftCheckPointsInterface {
    id: string
}

export type RepositoriesStateResponse = {
    checkpointID: number;
    checkpoint: string;
    scannedDateTime: string;
};
