import { Reducer } from 'redux';

import { PurchaseRequisitionState, PurchaseRequisitionTypes } from './types';

const INITIAL_STATE: PurchaseRequisitionState = {
    isLoading: false,
    newPurchaseRequisitionInfo: {
        id: 0,
        trackerNumber: 0,
        notes: '',
        type: undefined,
        requisitionGoal: '',
        deliveryPlace: undefined,
        requestedBy: '',
        purchaseOrganization: undefined,
        purchaseCenter: '',
        status: undefined,
        productList: [],
        isApproved: false,
        seniorComment: '',
        subtotal: 0,
        submittedToSenniorAt: '',
        openenedAt: '',
        refreshList: false,
    },
};

const reducer: Reducer<PurchaseRequisitionState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PurchaseRequisitionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        case PurchaseRequisitionTypes.SET_NEW_PURCHASE_REQUISITION_INFO:
            return { ...state, newPurchaseRequisitionInfo: { ...state.newPurchaseRequisitionInfo, ...action.payload } };
        default:
            return state;
    }
};

export default reducer;
