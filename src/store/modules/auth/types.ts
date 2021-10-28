import { OperatorProps, PurchaseOrganizationProps, RepresentativeProps, UserProps } from '../../../mocks/entities';

export enum AuthTypes {
    SET_REPRESENTATIVE = '@auth/SET_REPRESENTATIVE',
    SET_OPERATOR = '@auth/SET_OPERATOR',
    SET_USER_PO = '@auth/SET_USER_PO',
    LOGOUT = '@auth/LOGOUT',
}

export interface AuthState {
    userPO?: PurchaseOrganizationProps;
    representative?: UserProps & RepresentativeProps;
    operator?: UserProps & OperatorProps;
}

export interface AuthInterface {
    auth: AuthState;
}
