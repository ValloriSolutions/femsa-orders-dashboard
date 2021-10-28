import {
    Badge,
    Dropdown,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    DropdownItem,
    Row,
    Col,
    Card,
    colors,
    FlexBox,
} from '@vallorisolutions/foa-design-system';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { css } from 'styled-components';
import { api } from '../../api';
import { TicketStatusBadge } from '../../helpers/tickets';
import NewTicketForm from './NewTicketForm';
import ReactLoading from 'react-loading';
import { TicketProps, TicketStatus } from '../../mocks/entities';

interface LocalTicketsProps extends TicketProps {
    supplierOnline: boolean;
}

const Tickets: React.FC = (): JSX.Element => {
    const history = useHistory();
    const [ticketList, setTicketList] = useState<LocalTicketsProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchTickets = async (): Promise<void> => {
        const { data } = await api.get<LocalTicketsProps[]>('tickets');
        setTicketList(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return !isLoading && ticketList.length > 0 ? (
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
                                <TableCell component="th" order={'DESC'} orderBy={'title'} width="300px">
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
                            {ticketList.map((ticket: LocalTicketsProps) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>
                                        <a
                                            style={{ cursor: 'pointer' }}
                                            onClick={(): void => history.push(`ticket/${ticket.id}`)}
                                        >
                                            {ticket.title}
                                        </a>
                                    </TableCell>
                                    <TableCell>{ticket.orderNumber}</TableCell>
                                    <TableCell hasBadge>{TicketStatusBadge(ticket.status)?.badge}</TableCell>
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
                                        <Typography
                                            as="small"
                                            customStyles={{
                                                fontSize: 13,
                                                color: colors.text.secondary,
                                                marginBottom: 5,
                                            }}
                                        >
                                            24/03 - 15:32
                                        </Typography>
                                        <Badge
                                            variant={ticket.supplierOnline ? 'green' : 'gray'}
                                            label={`Fornecedor ${ticket.supplierOnline ? 'Online' : 'Offline'} `}
                                            secondary={!ticket.supplierOnline}
                                        />
                                    </TableCell>
                                    <TableCell actionCell>
                                        <Dropdown threeDots>
                                            <DropdownItem onClick={(): void => history.push(`ticket/${ticket.id}`)}>
                                                Ver
                                            </DropdownItem>
                                            {ticket.supplierOnline &&
                                                ticket.status !== TicketStatus.Cancelado &&
                                                ticket.status !== TicketStatus.Solucionado && (
                                                    <DropdownItem onClick={(): void => alert('aqui abre o chat')}>
                                                        Abrir Chat
                                                    </DropdownItem>
                                                )}
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
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default Tickets;
