export enum LayoutTypes {
    SET_IS_LOADING = '@general/SET_IS_LOADING',
    SET_DIALOG_INFO = '@general/SET_DIALOG_INFO',
    RESET_DIALOG = '@general/RESET_DIALOG',
}

export interface LayoutState {
    isLoading: boolean;
    dialog: {
        disableBackdropClick: boolean;
        isOpen: boolean;
        info: {
            title: string;
            subtitle: string;
            cancelButton?: { title: string; action?: (() => void) | undefined } | undefined;
            confirmButton?: { title: string; action?: (() => void) | undefined };
            children: React.ReactNode;
        };
    };
}

export interface LayoutInterface {
    general: LayoutState;
}
