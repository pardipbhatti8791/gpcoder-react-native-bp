import produce from 'immer';
import { Action } from '@root/store/auth/actions';
import { ActionType } from '@root/store/auth/actions-types';

interface RepositoriesStateInterface {
    loading: boolean;
    error: string | null;
    data: string[];
}

const initialState = {
    loading: false,
    error: null,
    data: [],
};

/**
 * @param state
 * @param action
 */
const reducer = (
    state: RepositoriesStateInterface = initialState,
    action: Action | any,
): RepositoriesStateInterface =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionType.LOGIN:
                draft.loading = true;
                draft.error = null;
                draft.data = [];
            case ActionType.LOGIN_SUCCESS:
                draft.loading = true;
                draft.error = null;
                draft.data = action.payload;
            case ActionType.LOGIN_ERROR:
                draft.loading = false;
                draft.error = action.payload;
                draft.data = [];
                return state;
            default:
                return state;
        }
    });

export default reducer;
