import { Reducer } from 'redux';

import { PurchaseRequisitionState, PurchaseRequisitionTypes } from './types';

const INITIAL_STATE: PurchaseRequisitionState = {
    isLoading: false,
    refreshList: false,
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
        submittedToSenniorAt: new Date(),
        openenedAt: '',
        refreshList: false,
    },
    requestForQuotation: undefined,
};

const reducer: Reducer<PurchaseRequisitionState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PurchaseRequisitionTypes.SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        case PurchaseRequisitionTypes.SET_NEW_PURCHASE_REQUISITION_INFO:
            return {
                ...state,
                newPurchaseRequisitionInfo: { ...state.newPurchaseRequisitionInfo, ...action.payload },
            };
        case PurchaseRequisitionTypes.SET_PRODUCTS_LIST:
            console.log('SET_PRODUCTS_LIST', action.payload);
            return {
                ...state,
                newPurchaseRequisitionInfo: { ...state.newPurchaseRequisitionInfo, productList: action.payload },
            };
        case PurchaseRequisitionTypes.SET_CURRENT_RFQ_INFO:
            console.log('SET_CURRENT_RFQ_INFO', action.payload);
            return {
                ...state,
                requestForQuotation: { ...action.payload },
            };
        case PurchaseRequisitionTypes.RESET_PRODUCTS_LIST:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;
