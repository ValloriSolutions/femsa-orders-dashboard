import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import NewTicketForm from '../../Pages/Tickets/NewTicketForm';
import { resetDialog, setDialogInfo } from '../../store/modules/layout/actions';

export default function useNewPurchaseModal(): { openNewPurchaseForm: () => void } {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('useNewPurchaseModal');

    const handleClose = (): void => {
        dispatch(resetDialog());
    };

    const openNewPurchaseForm = (): void => {
        dispatch(
            setDialogInfo({
                isOpen: true,
                info: {
                    title: 'Nova requisição de compra',
                    subtitle: 'Preencha os dados abaixo para criar sua requisição',
                    confirmButton: {
                        title: 'Continuar',
                        action: () => {
                            dispatch(resetDialog()), history.push('/requisicoes-de-compra/nova');
                        },
                    },
                    cancelButton: {
                        title: 'Cancelar',
                        action: () => handleClose,
                    },
                    children: <NewTicketForm />,
                },
            }),
        );
    };

    return {
        openNewPurchaseForm,
    };
}
