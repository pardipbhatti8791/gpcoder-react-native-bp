import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    authActionCreators,
    actions,
    rosters,
    modalSheet,
    activeShift,
    shiftReportsActionCreator,
    checkPoints,
    mode,
    log
} from '../store';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        Object.assign(
            {},
            authActionCreators,
            actions,
            rosters,
            modalSheet,
            activeShift,
            shiftReportsActionCreator,
            checkPoints,
            mode,
            log
        ),
        dispatch,
    );
};
