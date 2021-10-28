import { combineReducers } from 'redux';

import layout from './layout';
import auth from './auth';
import purchaseRequisition from './purchaseRequisition';

import { LayoutState } from './layout/types';
import { PurchaseRequisitionState } from './purchaseRequisition/types';
import { AuthState } from './auth/types';

export interface RootReducer {
    layout: LayoutState;
    auth: AuthState;
    purchaseRequisition: PurchaseRequisitionState;
}

const rootReducer = combineReducers({
    layout,
    auth,
    purchaseRequisition,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
