import { LayoutWrapper, IconTicket, IconCredit, IconDashboard } from '@vallorisolutions/foa-design-system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { UserRole } from '../../mocks/entities';
import NewRequestForm from '../../Pages/NewPurchaseRequisitionRequest/NewRequestForm';
import { setDialogInfo } from '../../store/modules/layout/actions';

const PageLayout: React.FC = ({ children }): JSX.Element => {
    const history = useHistory();
    const location = useLocation();
    const [term, setTerm] = useState('');
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };
    const navigate = (route: string): void => {
        history.push(route);
    };
    const openPRDialog = (): void => {
        dispatch(
            setDialogInfo({
                disableBackdropClick: true,
                isOpen: true,
                info: {
                    title: 'Nova requisição de compra',
                    subtitle: 'Preencha os dados abaixo para criar sua requisição',
                    children: <NewRequestForm />,
                },
            }),
        );
    };
    return (
        <LayoutWrapper
            searchPlaceholder={pathname === '/tickets' ? 'Digite o numero do ticket' : 'busque uma ordem de serviço'}
            menuItems={[
                {
                    title: 'Página Inicial',
                    onClick: (): void => navigate('/'),
                    icon: <IconDashboard />,
                    active: isActive('/'),
                },
                {
                    title: 'Tickets',
                    onClick: (): void => history.push('/tickets'),
                    icon: <IconTicket />,
                    active: isActive('/tickets'),
                },
                {
                    title: 'Ver Requisições',
                    onClick: (): void => history.push('/requisicoes-de-compra/'),
                    icon: <IconCredit />,
                    active: isActive('/requisicoes-de-compra/'),
                },
                {
                    title: 'Nova requisição',
                    icon: <IconCredit />,
                    onClick: (): void => openPRDialog(),
                },
            ]}
            searchTerm={term}
            onChange={(e): void => setTerm(e.target.value)}
            user={{
                id: '1',
                name: 'Suellen Marques',
                avatar: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
                email: 'suellen@femsa.com.br',
                role: UserRole.admin,
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
