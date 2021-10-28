import { PurchaseRequisitionProps } from '../../../mocks/entities';

export enum PurchaseRequisitionTypes {
    SET_IS_LOADING = '@purchaseRequisition/SET_IS_LOADING',
    SET_NEW_PURCHASE_REQUISITION_INFO = '@purchaseRequisition/SET_NEW_PURCHASE_REQUISITION_INFO',
    SET_PRODUCTS = '@purchaseRequisition/SET_PRODUCTS',
}

export interface PurchaseRequisitionState {
    isLoading: boolean;
    newPurchaseRequisitionInfo?: PurchaseRequisitionProps;
}

export interface OrderInterface {
    purchaseRequisition: PurchaseRequisitionState;
}
