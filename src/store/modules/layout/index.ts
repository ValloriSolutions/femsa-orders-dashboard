import { Reducer } from 'redux';

import { LayoutState, LayoutTypes } from './types';

const INITIAL_STATE: LayoutState = {
    isLoading: false,
    dialog: {
        disableBackdropClick: false,
        isOpen: false,
        info: {
            title: '',
            subtitle: '',
            cancelButton: {
                title: '',
                action: () => null,
            },
            confirmButton: {
                title: '',
                action: () => null,
            },
            children: null,
        },
    },
};

const reducer: Reducer<LayoutState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LayoutTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        case LayoutTypes.SET_DIALOG_INFO:
            return { ...state, dialog: action.payload };
        case LayoutTypes.RESET_DIALOG:
            return { ...state, dialog: { ...state.dialog, isOpen: false, children: null } };
        default:
            return state;
    }
};

export default reducer;
