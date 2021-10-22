import {
    Badge,
    Dropdown,
    OrderStatus,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TicketProps,
    Typography,
    DropdownItem,
    Row,
    Col,
    Card,
} from '@vallorisolutions/foa-design-system';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { css } from 'styled-components';
import { api } from '../../api';
import NewTicketForm from './NewTicketForm';

const Tickets: React.FC = (): JSX.Element => {
    const history = useHistory();
    const [ticketList, setTicketList] = useState<TicketProps[]>([]);

    const fetchTickets = async (): Promise<void> => {
        const { data } = await api.get<TicketProps[]>('tickets');
        setTicketList(data);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleStatus = (status: string): JSX.Element => {
        switch (status) {
            case OrderStatus.OPEN:
                return <Badge variant="green" label="Em Aberto" />;
            case OrderStatus.SOLVED:
                return <Badge variant="gray" label="Resolvido" />;
            case OrderStatus.CANCELED:
                return <Badge variant="gray_red" label="Cancelado" />;
            case OrderStatus.WAITING_O:
                return <Badge variant="red" label="Ag. Operador" />;
            default:
                return <Badge variant="green" label="Em Aberto" />;
        }
    };
    return (
        <>
            <Row>
                <Col>
                    <Typography as="h1">Todos os Tickets</Typography>
                </Col>
            </Row>
            <br />
            <Row customStyles={{ width: '100%' }}>
                <Col size={13}>
                    <Table
                        topToolbar={
                            <Typography as="h5" customStyles={{ margin: '40px 0 10px 0' }}>
                                Tickets em aberto
                            </Typography>
                        }
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" order={'DESC'} orderBy={'title'}>
                                    Titulo
                                </TableCell>
                                <TableCell component="th" order={'DESC'} orderBy={'orderNumber'}>
                                    Nº da Ordem
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'status'}>
                                    Status
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'status'}>
                                    Atualizado em
                                </TableCell>
                                <TableCell component="th">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketList.map((ticket: TicketProps) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>{ticket.title}</TableCell>
                                    <TableCell>{ticket.orderNumber}</TableCell>
                                    <TableCell hasBadge>{handleStatus(ticket.status)}</TableCell>
                                    <TableCell
                                        hasBadge
                                        customStyles={css`
                                            & > div {
                                                display: flex;
                                                align-items: center;
                                                align-content: center;
                                            }
                                        `}
                                    >
                                        24/03 - 15:32
                                        <Badge bordered variant="red_gray" label="Fornecedor Offline" />
                                    </TableCell>
                                    <TableCell actionCell>
                                        <Dropdown threeDots>
                                            <DropdownItem onClick={(): void => history.push(`ticket/${ticket.id}`)}>
                                                Ver
                                            </DropdownItem>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Col>
                <Col customStyles={{ marginLeft: '30px' }} size={4}>
                    <Card verticalAlign="flex-start" horizontalAlign="flex-start" customStyles={{ padding: '25px' }}>
                        <Typography as="h5">Iniciar nova negociação</Typography>
                        <br />
                        <NewTicketForm />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Tickets;
