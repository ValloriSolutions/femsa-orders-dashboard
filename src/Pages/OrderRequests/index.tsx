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
} from '@vallorisolutions/foa-design-system';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { api } from '../../api';
import { OrderStatusBadges } from '../../helpers/orders';
import { PurchaseRequisitionProps } from '../../mocks/entities';

interface LocalOrdersProps extends PurchaseRequisitionProps {
    supplierOnline?: boolean;
}

const orders: React.FC = (): JSX.Element => {
    // const history = useHistory();
    const [ordersList, setordersList] = useState<LocalOrdersProps[]>([]);

    const fetchOrders = async (): Promise<void> => {
        const { data } = await api.get<LocalOrdersProps[]>('orders');
        setordersList(data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
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
                                <TableCell component="th" order={'ASC'} orderBy={'type'} width="100px">
                                    Tipo
                                </TableCell>
                                <TableCell component="th" order={'DESC'} orderBy={'requisitionGoal'} width="600px">
                                    Objetivo
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'status'}>
                                    Status
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'submittedToSenniorAt'}>
                                    Data de envio
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
                                        {order.submittedToSenniorAt}
                                    </TableCell>
                                    <TableCell component="td"></TableCell>
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
    );
};

export default orders;
