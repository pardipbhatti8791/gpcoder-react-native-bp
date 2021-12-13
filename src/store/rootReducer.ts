import { combineReducers } from 'redux';
import auth from '@root/store/auth/reducer';
import actions from '@root/store/actions/reducer';

const reducers = combineReducers({
    auth,
    actions,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
