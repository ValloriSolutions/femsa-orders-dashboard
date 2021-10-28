import { combineReducers } from 'redux';

import layout from './layout';

import { LayoutState } from './layout/types';
import purchaseRequisition from './purchaseRequisition';
import { PurchaseRequisitionState } from './purchaseRequisition/types';

export interface RootReducer {
    layout: LayoutState;
    purchaseRequisition: PurchaseRequisitionState;
}

const rootReducer = combineReducers({
    layout,
    purchaseRequisition,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
