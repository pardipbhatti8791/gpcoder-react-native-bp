import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators, actions, rosters, modalSheet } from '../store';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        Object.assign({}, authActionCreators, actions, rosters, modalSheet),
        dispatch,
    );
};
