/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Row,
    Col,
    colors,
    FlexBox,
    Dropdown,
    DropdownItem,
} from '@vallorisolutions/foa-design-system';
import ReactLoading from 'react-loading';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { api } from '../../api';
import { OrderStatusBadges } from '../../helpers/orders';
import { PurchaseRequisitionProps } from '../../mocks/entities';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useUrl } from '../../helpers/utils';
interface LocalOrdersProps extends PurchaseRequisitionProps {
    supplierOnline?: boolean;
}

const orders: React.FC = (): JSX.Element => {
    // const history = useHistory();
    const [ordersList, setordersList] = useState<LocalOrdersProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { navigate } = useUrl();

    const fetchOrders = async (): Promise<void> => {
        const { data } = await api.get<LocalOrdersProps[]>('purchase-requisition');
        console.log('aaaaaaaaaaaaaaaaaaaa', data);
        setordersList(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return !isLoading && ordersList.length > 0 ? (
        <>
            <Row>
                <Col>
                    <Typography as="h1">Requisições de Compra</Typography>
                </Col>
            </Row>
            <br />
            <Row customStyles={{ width: '100%' }}>
                <Col>
                    <Table cardCustomStyles={{ padding: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" order={'DESC'} orderBy={'id'} width="150px">
                                    Nº da Ordem
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'type'} width="200px">
                                    Tipo
                                </TableCell>
                                <TableCell component="th" order={'DESC'} orderBy={'requisitionGoal'} width="400px">
                                    Objetivo
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'status'}>
                                    Status
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'submittedToSenniorAt'}>
                                    Numero de rastreamento
                                </TableCell>
                                <TableCell component="th">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordersList.map((order: LocalOrdersProps) => (
                                // todo: add fields to the table
                                <TableRow key={order.id}>
                                    <TableCell component="td">{order.id}</TableCell>
                                    <TableCell component="td">{order.type}</TableCell>
                                    <TableCell component="td">
                                        <Typography
                                            as="small"
                                            customStyles={{ fontSize: 13, color: colors.text.secondary }}
                                        >
                                            {order.requisitionGoal}
                                        </Typography>
                                    </TableCell>
                                    <TableCell component="td" hasBadge>
                                        {OrderStatusBadges(order.status)?.badge}
                                    </TableCell>
                                    <TableCell component="td" hasBadge>
                                        {order?.trackerNumber !== 0 ? order?.trackerNumber : 'N/a'}
                                    </TableCell>
                                    <TableCell actionCell>
                                        <Dropdown threeDots>
                                            {order.status === 'Solicitação Aprovada' && (
                                                <DropdownItem
                                                    onClick={() => navigate('/solicitar-cotação/' + order.id)}
                                                >
                                                    Solicitar de Cotação
                                                </DropdownItem>
                                            )}
                                            {order.status === 'Rascunho' && (
                                                <DropdownItem onClick={() => undefined}>
                                                    Finalizar Requisição
                                                </DropdownItem>
                                            )}
                                            {order.status !== 'Ordem Cancelada' && (
                                                <DropdownItem onClick={() => undefined}>
                                                    Cancelar Solicitação
                                                </DropdownItem>
                                            )}
                                            <DropdownItem onClick={() => undefined}>Ver Solicitação</DropdownItem>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Col>
            </Row>
            <br />
            <br />
            <br />
        </>
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default orders;
