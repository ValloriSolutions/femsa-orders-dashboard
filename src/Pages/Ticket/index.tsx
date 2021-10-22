import {
    Button,
    Card,
    Col,
    IconArrowLeft,
    MessageProps,
    Row,
    TicketProps,
    Typography,
} from '@vallorisolutions/foa-design-system';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { api } from '../../api';
import UserHeader from './UserHeader';

const Ticket: React.FC = (): JSX.Element => {
    const history = useHistory();
    const { pathname } = useLocation();
    const id = pathname.split('/')[2];
    const [ticketData, setTicketData] = useState<TicketProps>();
    const [messageData, setMessageData] = useState<MessageProps[]>([]);

    const fetchTicket = async (): Promise<void> => {
        const { data } = await api.get<TicketProps>(`tickets/${id}`);
        setTicketData(data);
    };
    const fetchMessages = async (): Promise<void> => {
        const { data } = await api.get<MessageProps[]>(`messages?ticketId=9bce02c`);
        setMessageData(data);
    };

    useEffect(() => {
        fetchTicket();
        fetchMessages();
    }, []);

    return ticketData ? (
        <Card fullWidth verticalAlign="flex-start" horizontalAlign="flex-start">
            <Row fluid>
                <Col size={0} customStyles={{ marginRight: 20 }}>
                    <Button ghost onClick={(): void => history.goBack()}>
                        <IconArrowLeft />
                    </Button>
                </Col>

                <Col size={11}>
                    <Typography as="h3">
                        Ticket Nº #{ticketData.id} - Ordem #{ticketData.orderNumber}
                    </Typography>
                    <br />
                    <br />
                    <Typography as="h4" variant="secondary" customStyles={{ fontWeight: 500 }}>
                        {ticketData.title}
                    </Typography>
                    <br />

                    {messageData ? (
                        messageData.map((message: MessageProps) => (
                            <>
                                <UserHeader
                                    name={message.from ?? ticketData.supplierName}
                                    avatar=""
                                    date={message.when ?? 'ontem, as 12:45'}
                                />
                                <Typography as="p" variant="secondary" customStyles={{ fontWeight: 500, padding: 20 }}>
                                    <span dangerouslySetInnerHTML={{ __html: message.description }} />
                                </Typography>
                                <br />
                                <hr style={{ borderBottom: '1px solid #ccc' }} />
                                <br />
                            </>
                        ))
                    ) : (
                        <Typography as="h4" variant="secondary" customStyles={{ fontWeight: 500 }}>
                            Nenhuma mensagem encontrada para este ticket
                        </Typography>
                    )}
                </Col>
            </Row>
        </Card>
    ) : (
        <div>Loading...</div>
    );
};

export default Ticket;
