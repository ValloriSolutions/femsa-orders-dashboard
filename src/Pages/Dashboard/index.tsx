import { Button } from '@vallorisolutions/foa-design-system';
import React from 'react';
import { useLogout } from '../../helpers/utils';

const Dashboard: React.FC = (): JSX.Element => {
    return (
        <>
            <div>Dashboard</div>
            <Button
                onClick={(): void => {
                    useLogout();
                }}
            >
                Logout
            </Button>
        </>
    );
};

export default Dashboard;
