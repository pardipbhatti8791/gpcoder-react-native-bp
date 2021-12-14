import produce from 'immer';
import { Action } from '@root/store/rosters/actions';
import { ActionType } from '@root/store/rosters/actions-types';

interface RepositoriesStateInterface {
    roasterLoading: boolean;
    error: string | null;
    rosterData: any;
}

const initialState = {
    roasterLoading: false,
    error: null,
    rosterData: [],
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
            case ActionType.ROSTERS_INIT:
                draft.roasterLoading = true;
                draft.error = null;
                draft.rosterData = [];

                return draft;
            case ActionType.ROSTERS_GET_SUCCESS:
                draft.roasterLoading = false;
                draft.error = null;
                draft.rosterData = action.payload;

                return draft;
            case ActionType.ROSTERS_GET_FAILED:
                draft.roasterLoading = false;
                draft.error = action.payload;
                draft.rosterData = [];

                return draft;
            default:
                return draft;
        }
    });

export default reducer;
