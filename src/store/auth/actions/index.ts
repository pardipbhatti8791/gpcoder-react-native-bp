import { ActionType } from '@root/store/auth/actions-types';

interface LoginAction {
    type: ActionType.LOGIN;
}

interface LoginSuccessAction {
    type: ActionType.LOGIN_SUCCESS;
    payload: string[];
}

interface LoginErrorAction {
    type: ActionType.LOGIN_ERROR;
    payload: string;
}

export type Action = LoginAction | LoginSuccessAction | LoginErrorAction;
