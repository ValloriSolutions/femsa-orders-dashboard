import {
    Button,
    Card,
    Col,
    colors,
    Divider,
    FlexBox,
    IconArrowLeft,
    MessageProps,
    Row,
    spacing,
    TicketProps,
    TicketStatus,
    Typography,
} from '@vallorisolutions/foa-design-system';
import { colors as palette } from '@vallorisolutions/foa-design-system';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { api } from '../../api';
import { TicketStatusBadge } from '../../helpers/tickets';
import UserHeader from './UserHeader';
import ReactLoading from 'react-loading';
import RichTextEditor from '../../components/Editor/Editor';

const Ticket: React.FC = (): JSX.Element => {
    const history = useHistory();
    const { pathname } = useLocation();
    const id = pathname.split('/')[2];
    const [ticketData, setTicketData] = useState<TicketProps>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [messageData, setMessageData] = useState<MessageProps[]>([]);

    const fetchTicket = async (): Promise<void> => {
        const { data } = await api.get<TicketProps>(`tickets/${id}`);
        setTicketData(data);
        setIsLoading(false);
    };
    const fetchMessages = async (): Promise<void> => {
        const { data } = await api.get<MessageProps[]>(`messages?ticketId=9bce02c`);
        setMessageData(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTicket();
        fetchMessages();
    }, []);

    const boxProps = {
        noPadding: true,
        horizontalAlign: 'space-between',
        verticalAlign: 'center',
        fullWidth: true,
        direction: 'row',
    };

    return !isLoading && ticketData ? (
        <>
            <Card fullWidth verticalAlign="flex-start" horizontalAlign="flex-start">
                <Row fluid customStyles={{ flexWrap: 'wrap' }}>
                    <Col size={0} customStyles={{ marginRight: 20 }}>
                        <Button ghost onClick={(): void => history.goBack()}>
                            <IconArrowLeft />
                        </Button>
                    </Col>

                    <Col size={10} customStyles={{ paddingRight: '2rem' }}>
                        <Typography as="h3">
                            Ticket Nº #{ticketData.id} - Ordem #{ticketData.orderNumber}
                        </Typography>
                        <br />
                        <br />
                        <Typography as="h4" customStyles={{ fontWeight: 500 }}>
                            {ticketData.title}
                        </Typography>
                        <br />

                        {messageData ? (
                            messageData.map((message: MessageProps) => (
                                <div key={message.id}>
                                    <UserHeader
                                        name={message.from ?? ticketData.supplierName}
                                        avatar=""
                                        date={message.when ?? 'ontem, as 12:45'}
                                    />
                                    <Typography as="p" customStyles={{ fontWeight: 500, padding: 20 }}>
                                        <span dangerouslySetInnerHTML={{ __html: message.description }} />
                                    </Typography>
                                    <br />
                                    <hr style={{ borderBottom: '1px solid #ccc' }} />
                                    <br />
                                </div>
                            ))
                        ) : (
                            <Typography as="h4" customStyles={{ fontWeight: 500 }}>
                                Nenhuma mensagem encontrada para este ticket
                            </Typography>
                        )}
                        {ticketData?.status !== TicketStatus.CANCELED ? (
                            <div
                                style={{
                                    padding: spacing.dialog,
                                    border: '1px solid #ddd',
                                    boxShadow: '0px 0px 5px #ddd',
                                }}
                            >
                                <Typography as="h6" customStyles={{ fontWeight: 500 }}>
                                    Enviar nova mensagem
                                </Typography>
                                <br />
                                <RichTextEditor />

                                <Divider fullWidth />
                                <FlexBox
                                    fullWidth
                                    noPadding
                                    horizontalAlign="flex-end"
                                    verticalAlign="center"
                                    direction="row"
                                >
                                    <Button
                                        small
                                        size="fluid"
                                        onClick={(): void => history.goBack()}
                                        style={{ marginRight: '20px', display: 'inline-block' }}
                                    >
                                        Enviar
                                    </Button>
                                    <Button
                                        small
                                        size="fluid"
                                        variant="secondary"
                                        onClick={(): void => history.goBack()}
                                    >
                                        Cancelar
                                    </Button>
                                </FlexBox>
                            </div>
                        ) : (
                            <Card>
                                <Typography as="p" customStyles={{ fontWeight: 500 }}>
                                    Esta conversa foi marcada como <strong>RESOLVIDA</strong>, portanto não é possível
                                    adicionar mais mensagens.
                                </Typography>
                            </Card>
                        )}
                    </Col>

                    <Col size={4} collapse="lg">
                        <Card
                            fullWidth
                            verticalAlign="flex-start"
                            horizontalAlign="flex-start"
                            isCard
                            direction="column"
                            customStyles={{ border: `1px solid ${palette.colors.gray.light} !important` }}
                        >
                            <FlexBox {...boxProps}>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    Solicitante
                                </Typography>
                                <Typography as="p" customStyles={{ fontWeight: 500 }}>
                                    {ticketData.supplierName}
                                </Typography>
                            </FlexBox>
                            <br />
                            <FlexBox {...boxProps}>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    Fornecedor
                                </Typography>
                                <Typography as="p" customStyles={{ fontWeight: 500 }}>
                                    {ticketData.supplierName}
                                </Typography>
                            </FlexBox>
                            <br />
                            <FlexBox {...boxProps}>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    Ultima Atividade
                                </Typography>
                                <Typography as="p" customStyles={{ fontWeight: 500 }}>
                                    {ticketData.updatedAt}
                                </Typography>
                            </FlexBox>
                            <Divider fullWidth />
                            <FlexBox {...boxProps}>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    Nº da Ordem
                                </Typography>
                                <Typography as="p" customStyles={{ fontWeight: 500 }}>
                                    {ticketData.orderNumber}
                                </Typography>
                            </FlexBox>
                            <br />
                            <FlexBox {...boxProps}>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    Assunto
                                </Typography>
                                <Typography as="p" customStyles={{ fontWeight: 500 }}>
                                    {ticketData.subject}
                                </Typography>
                            </FlexBox>
                            <br />
                            <FlexBox {...boxProps}>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    Status
                                </Typography>
                                <Typography as="small" customStyles={{ fontWeight: 500 }}>
                                    {TicketStatusBadge(ticketData.status)?.badge}
                                </Typography>
                            </FlexBox>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </>
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default Ticket;
