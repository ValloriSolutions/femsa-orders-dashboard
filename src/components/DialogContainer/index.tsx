import { Dialog } from '@vallorisolutions/foa-design-system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../store/modules';
import { resetDialog } from '../../store/modules/layout/actions';

const DialogContainer = (): JSX.Element => {
    const dispatch = useDispatch();
    const { dialog } = useSelector((state: RootReducer) => state.layout);

    return (
        <Dialog
            horizontalAlign="flex-start"
            isOpen={dialog.isOpen}
            setOpen={(): void => dispatch(resetDialog())}
            info={dialog.info}
            width="700px"
        >
            {dialog.info.children}
        </Dialog>
    );
};

export default DialogContainer;
