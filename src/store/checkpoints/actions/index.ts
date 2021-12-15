import { ActionType } from '@root/store/checkpoints/actions-types';
import { RepositoriesStateResponse } from '../interfaces';

interface InitShiftCheckpoints {
    type: ActionType.SHIFT_CHECKPOINTS_INIT;
}

interface SuccessShiftCheckpoints {
    type: ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS;
    payload: RepositoriesStateResponse[];
}

interface FailedShiftCheckpoints {
    type: ActionType.SHIFT_CHECKPOINTS_GET_FAILED;
    payload: string;
}

export type Action =
    | InitShiftCheckpoints
    | SuccessShiftCheckpoints
    | FailedShiftCheckpoints;
