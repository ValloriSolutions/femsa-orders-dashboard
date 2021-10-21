import React from 'react';
import { IconDashboard, IconTicket, IconCredit, MenuItemProps } from '@vallorisolutions/foa-design-system';
import { useHistory, useLocation } from 'react-router-dom';

export const MenuItems = (): Array<MenuItemProps> => {
    const history = useHistory();
    const location = useLocation();

    const isActive = (path: string): boolean => {
        return location.pathname === path;
    };
    const navigate = (route: string): void => {
        history.push(route);
    };
    return [
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
            title: 'Req. de Compra',
            onClick: (): void => history.push('#'),
            icon: <IconCredit />,
            dropdownItems: [
                {
                    title: 'Ver Requisições',
                    onClick: (): void => history.push('requisicoes-de-compra'),
                    active: isActive('/requisicoes-de-compra/'),
                },
                {
                    title: 'Criar Requisição',
                    onClick: (): void => history.push('requisicoes-de-compra/nova/'),
                    active: isActive('/requisicoes-de-compra/nova/'),
                },
            ],
        },
    ];
};
