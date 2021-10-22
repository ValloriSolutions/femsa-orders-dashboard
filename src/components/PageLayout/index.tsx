import { LayoutWrapper, UserRole, IconTicket } from '@vallorisolutions/foa-design-system';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { MenuItems } from '../../helpers/Menu';

const PageLayout: React.FC = ({ children }): JSX.Element => {
    const [term, setTerm] = useState('');
    const { pathname } = useLocation();
    return (
        <LayoutWrapper
            searchPlaceholder={pathname === '/tickets' ? 'Digite o numero do ticket' : 'busque uma ordem de serviço'}
            menuItems={MenuItems()}
            searchTerm={term}
            onChange={(e): void => setTerm(e.target.value)}
            user={{
                id: '1',
                name: 'Suellen Marques',
                avatar: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
                email: 'suellen@femsa.com.br',
                role: UserRole.ADMIN,
            }}
            notifications={[
                {
                    id: '1',
                    title: 'Novo ticket',
                    description: 'Novo ticket criado',
                    icon: <IconTicket />,
                    url: 'https://femsa.com.br',
                },
                {
                    id: '2',
                    title: 'Ticket Atualizado',
                    description: 'Novo lote de canetas',
                    icon: <IconTicket />,
                    url: 'https://femsa.com.br',
                },
            ]}
            messages={[
                {
                    id: '1',
                    ticketId: '1',
                    title: 'Novo ticket',
                    description: 'Novo ticket criado',
                    url: 'https://femsa.com.br',
                },
            ]}
        >
            {children}
        </LayoutWrapper>
    );
};

export default PageLayout;
