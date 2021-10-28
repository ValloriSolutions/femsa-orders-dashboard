/* eslint-disable @typescript-eslint/no-explicit-any */
import { action } from 'typesafe-actions';
import { OperatorProps, PurchaseOrganizationProps, RepresentativeProps, UserProps } from '../../../mocks/entities';

import { AuthTypes } from './types';

export const setOperatorInfo = (operator: UserProps & OperatorProps): any => action(AuthTypes.SET_OPERATOR, operator);
export const setRepresentativeInfo = (representative: UserProps & RepresentativeProps): any =>
    action(AuthTypes.SET_OPERATOR, representative);
export const setPOInfo = (po: PurchaseOrganizationProps): any => action(AuthTypes.SET_USER_PO, po);
