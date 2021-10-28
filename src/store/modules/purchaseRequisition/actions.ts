/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from 'typesafe-actions';
import { ProductProps, PurchaseRequisitionProps } from '../../../mocks/entities';

import { PurchaseRequisitionTypes } from './types';

export const setIsLoading = (isLoading: boolean): any => action(PurchaseRequisitionTypes.SET_IS_LOADING, isLoading);
export const setPRInfo = (data: Partial<PurchaseRequisitionProps>): any =>
    action(PurchaseRequisitionTypes.SET_NEW_PURCHASE_REQUISITION_INFO, data);
export const resetPRInfo = (): any => action(PurchaseRequisitionTypes.SET_NEW_PURCHASE_REQUISITION_INFO);

export const setProductList = (productList: ProductProps[]): any =>
    action(PurchaseRequisitionTypes.SET_PRODUCTS_LIST, productList);
