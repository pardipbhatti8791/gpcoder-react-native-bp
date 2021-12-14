import { combineReducers } from 'redux';
import auth from '@root/store/auth/reducer';
import actions from '@root/store/actions/reducer';
import rosters from '@root/store/rosters/reducer';
import modalSheet from '@root/store/global_modal/reducer';

const reducers = combineReducers({
    auth,
    actions,
    rostersByDays: rosters,
    modalSheet
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
