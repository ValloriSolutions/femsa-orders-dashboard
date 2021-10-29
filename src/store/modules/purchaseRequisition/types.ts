import { PurchaseRequisitionProps, RequestForQuotationProps } from '../../../mocks/entities';

export enum PurchaseRequisitionTypes {
    SET_IS_LOADING = '@purchaseRequisition/SET_IS_LOADING',
    SET_NEW_PURCHASE_REQUISITION_INFO = '@purchaseRequisition/SET_NEW_PURCHASE_REQUISITION_INFO',
    SET_PRODUCTS_LIST = '@purchaseRequisition/SET_PRODUCTS_LIST',
    RESET_PRODUCTS_LIST = '@purchaseRequisition/RESET_PRODUCTS_LIST',
    SET_CURRENT_RFQ_INFO = '@requestforquotation/SET_CURRENT_RFQ_INFO',
}

export interface PurchaseRequisitionState {
    isLoading: boolean;
    refreshList: boolean;
    newPurchaseRequisitionInfo: PurchaseRequisitionProps;
    requestForQuotation?: RequestForQuotationProps;
}

export interface OrderInterface {
    purchaseRequisition: PurchaseRequisitionState;
}
