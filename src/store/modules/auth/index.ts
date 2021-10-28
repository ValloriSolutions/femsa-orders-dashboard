import { Reducer } from 'redux';

import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
    operator: undefined,
    representative: undefined,
    userPO: undefined,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthTypes.SET_OPERATOR:
            console.log('SET_OPERATOR', action.payload);
            return { ...state, operator: action.payload };
        case AuthTypes.SET_REPRESENTATIVE:
            console.log('SET_REPRESENTATIVE', action.payload);
            return { ...state, representative: action.payload };
        case AuthTypes.SET_USER_PO:
            console.log('SET_USER_PO', action.payload);
            return { ...state, userPO: action.payload };
        case AuthTypes.LOGOUT:
            console.log('LOGOUT');
            return { ...state, operator: undefined, representative: undefined, userPO: undefined };
        default:
            return state;
    }
};

export default reducer;
