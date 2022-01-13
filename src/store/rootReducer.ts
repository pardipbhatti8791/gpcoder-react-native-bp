import { combineReducers } from 'redux';
import auth from '@root/store/auth/reducer';
import actions from '@root/store/actions/reducer';
import rosters from '@root/store/rosters/reducer';
import modalSheet from '@root/store/global_modal/reducer';
import actionS from '@root/store/activeShift/reducer';
import shiftReports from '@root/store/shift-reports/reducer';
import checkpoints from '@root/store/checkpoints/reducer';
import mode from '@root/store/mode/reducer';

const reducers = combineReducers({
    auth,
    actions,
    rostersByDays: rosters,
    modalSheet,
    activeShift: actionS,
    shiftReports,
    checkpoints,
    mode,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
