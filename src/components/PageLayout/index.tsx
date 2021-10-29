import {
    LayoutWrapper,
    IconTicket,
    IconCredit,
    IconDashboard,
    FlexBox,
    colors,
    Button,
} from '@vallorisolutions/foa-design-system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api';
import { useModals } from '../../helpers/modals';
import { useLogout, usePath, useUrl } from '../../helpers/utils';
import { PurchaseOrganizationProps, PurchaseRequisitionProps } from '../../mocks/entities';
import NewRequestForm from '../../Pages/NewPurchaseRequisitionRequest/NewRequestForm';
import { RootReducer } from '../../store/modules';
import { setOperatorInfo, setPOInfo, setRepresentativeInfo } from '../../store/modules/auth/actions';
import ReactLoading from 'react-loading';

const PageLayout: React.FC = ({ children }): JSX.Element => {
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();
    const { pathname, isActive } = usePath();
    const { navigate } = useUrl();
    const { openPRDialog } = useModals(<NewRequestForm />);
    const user = JSON.parse(localStorage.getItem('operator' || 'representative') || '');
    const [isLoading, setIsLoading] = useState(true);
    const fetchPurchaseOrganization = async (center: number): Promise<void> => {
        const { data } = await api.get<PurchaseOrganizationProps[]>('purchase-organization', {
            params: {
                q: { center: { id: center } },
            },
        });
        dispatch(setPOInfo(data[0]));
    };

    useEffect(() => {
        if (user.center) {
            dispatch(setOperatorInfo(user));
            fetchPurchaseOrganization(user.center.id);
        } else {
            dispatch(setRepresentativeInfo(user));
        }
        setIsLoading(false);
    }, [user]);

    const { id }: PurchaseRequisitionProps = useSelector(
        (state: RootReducer) => state.purchaseRequisition.newPurchaseRequisitionInfo,
    );

    return !isLoading ? (
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
                    onClick: (): void => navigate('/tickets'),
                    icon: <IconTicket />,
                    active: isActive('/tickets'),
                },
                {
                    title: 'Ver Requisições',
                    onClick: (): void => navigate('/requisicoes-de-compra/'),
                    icon: <IconCredit />,
                    active: isActive('/requisicoes-de-compra/'),
                },
                {
                    title: 'Nova requisição',
                    icon: <IconCredit />,
                    onClick: (): void => openPRDialog(),
                    active: isActive(`/requisicoes-de-compra/nova/${id}`),
                },
                {
                    title: 'Solicitar Cotação',
                    icon: <IconCredit />,
                    onClick: (): void => navigate('/solicitar-cotação/1548'),
                    active: isActive(`/solicitar-cotação/1548`),
                },
            ]}
            searchTerm={term}
            onChange={(e): void => setTerm(e.target.value)}
            user={{
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                email: user.email,
                role: user.role,
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
            <br />
            <br />
            <br />
            <br />
            <Button onClick={(): void => useLogout()}>Logout</Button>
        </LayoutWrapper>
    ) : (
        <FlexBox fullScreen verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.colors.red} />
        </FlexBox>
    );
};

export default PageLayout;
