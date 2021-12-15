import produce from 'immer';
import { Action } from '@root/store/checkpoints/actions';
import { ActionType } from '@root/store/checkpoints/actions-types';
import { RepositoriesStateResponse } from '../interfaces';

interface RepositoriesStateInterface {
    shiftCheckoutLoading: boolean;
    error: string | null;
    shiftCheckpointsData: RepositoriesStateResponse[];
}

const initialState = {
    shiftCheckoutLoading: false,
    error: null,
    shiftCheckpointsData: [],
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
            case ActionType.SHIFT_CHECKPOINTS_INIT:
                draft.shiftCheckoutLoading = true;
                draft.error = null;
                draft.shiftCheckpointsData = [];
                return draft;
            case ActionType.SHIFT_CHECKPOINTS_GET_SUCCESS:
                draft.shiftCheckoutLoading = false;
                draft.error = null;
                draft.shiftCheckpointsData = action.payload;
                return draft;
            case ActionType.SHIFT_CHECKPOINTS_GET_FAILED:
                draft.shiftCheckoutLoading = false;
                draft.error = action.payload;
                draft.shiftCheckpointsData = [];
                return draft;
            default:
                return draft;
        }
    });

export default reducer;
