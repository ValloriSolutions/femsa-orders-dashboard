import { PurchaseRequisitionProps } from '../../../mocks/entities';

export enum PurchaseRequisitionTypes {
    SET_IS_LOADING = '@purchaseRequisition/SET_IS_LOADING',
    SET_NEW_PURCHASE_REQUISITION_INFO = '@purchaseRequisition/SET_NEW_PURCHASE_REQUISITION_INFO',
    SET_PRODUCTS_LIST = '@purchaseRequisition/SET_PRODUCTS_LIST',
    RESET_PRODUCTS_LIST = '@purchaseRequisition/RESET_PRODUCTS_LIST',
}

export interface PurchaseRequisitionState {
    isLoading: boolean;
    refreshList: boolean;
    newPurchaseRequisitionInfo: PurchaseRequisitionProps;
}

export interface OrderInterface {
    purchaseRequisition: PurchaseRequisitionState;
}
