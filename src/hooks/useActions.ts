import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators, actions, rosters } from '../store';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
        Object.assign({}, authActionCreators, actions, rosters),
        dispatch,
    );
};
