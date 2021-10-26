import { useEffect } from 'react';
import React from 'react';
import useNewPurchaseModal from '../../hooks/useNewPurchaseModal';

const NewOrderRequest: React.FC = (): JSX.Element => {
    const { openNewPurchaseForm } = useNewPurchaseModal();

    useEffect(() => {
        openNewPurchaseForm();
    }, []);

    return <div>NewOrderRequest</div>;
};

export default NewOrderRequest;
