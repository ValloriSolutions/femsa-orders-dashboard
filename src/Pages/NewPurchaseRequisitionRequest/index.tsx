/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Typography, FlexBox, colors, Divider, Button, IconPrint } from '@vallorisolutions/foa-design-system';
import EmptyCard from '../../components/EmptyCard';
import { useUrl, uuid10 } from '../../helpers/utils';
import ReactLoading from 'react-loading';
import { resetDialog, setRefreshList } from '../../store/modules/layout/actions';
import { PurchaseRequisitionProps } from '../../mocks/entities';
import { RootReducer } from '../../store/modules';
import { useModals } from '../../helpers/modals';
import NewProductsForm from './NewProductsForm';
import ProductsTable from './ProductsTable';
import { AuthState } from '../../store/modules/auth/types';
import { api } from '../../api';
import { resetPRInfo } from '../../store/modules/purchaseRequisition/actions';

const NewPurchaseRequisitionRequest: React.FC = (): JSX.Element => {
    const trackerNumber = uuid10();
    const dispatch = useDispatch();
    const { navigate } = useUrl();
    const [loading, setLoading] = useState(false);
    const newPR: PurchaseRequisitionProps = useSelector(
        (state: RootReducer) => state.purchaseRequisition.newPurchaseRequisitionInfo,
    );
    const { userPO }: AuthState = useSelector((state: RootReducer) => state.auth);

    const handleSubmit = async (): Promise<void> => {
        await api.post<PurchaseRequisitionProps>('purchase-requisition', {
            ...newPR,
            status: 'Requisição Criada',
            trackerNumber,
        });
        setLoading(false);
        dispatch(setRefreshList());
        dispatch(resetPRInfo());
        dispatch(resetDialog());
        navigate('/ordem-gerada/' + trackerNumber);
    };

    const saveToDatabaseAsDraft = async (): Promise<void> => {
        setLoading(true);
        await api.post<PurchaseRequisitionProps>('purchase-requisition', { ...newPR, status: 'Rascunho' });
        setLoading(false);
        dispatch(setRefreshList());
        dispatch(resetPRInfo());
        dispatch(resetDialog());
        navigate('/requisicoes-de-compra/');
    };

    const CancelButtons: React.FC = (): JSX.Element => {
        return (
            <div
                style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Button
                    onClick={(): Promise<void> => saveToDatabaseAsDraft()}
                    variant="primary"
                    color="primary"
                    style={{
                        marginRight: '1rem',
                    }}
                >
                    {!loading ? (
                        'Sim, gostaria de salvar como rascunho'
                    ) : (
                        <ReactLoading type="bars" color={colors.colors.white} height="24" />
                    )}
                </Button>
                <Button onClick={(): void => dispatch(resetDialog())} variant="secondary">
                    Não, quero permanecer nesta página
                </Button>
            </div>
        );
    };

    const { openCancelDialog } = useModals(<CancelButtons />);
    const handleCancel = (): void => {
        openCancelDialog();
    };

    useEffect(() => {
        !newPR.type && navigate('/requisicoes-de-compra');
    }, []);

    useEffect(() => {
        dispatch(setRefreshList());
    }, []);

    const { openProductDialog } = useModals(<NewProductsForm />);
    return newPR.type ? (
        <>
            <Row key={newPR.id}>
                <Col>
                    <Typography as="h1">Nova Requisição de Compra</Typography>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row customStyles={{ width: '100%', height: '100%' }}>
                <Col size={4} customStyles={{ paddingRight: '30px' }}>
                    <FlexBox
                        fullWidth
                        horizontalAlign="space-between"
                        direction="row"
                        noPadding
                        customStyles={{ flexWrap: 'wrap', justifyContent: 'space-between' }}
                    >
                        <Button
                            small
                            onClick={(): void => (newPR.productList?.[0] ? window.print() : undefined)}
                            disabled={!newPR.productList?.[0]}
                            variant={newPR.productList?.[0] ? 'secondary' : 'disabled'}
                        >
                            <IconPrint /> &nbsp; Imprimir
                        </Button>
                        <Button small onClick={(): void => openProductDialog()} variant="primary">
                            Adicionar Produtos
                        </Button>
                    </FlexBox>
                    <Divider fullWidth borderColor={colors.colors.gray.lighter} />
                    <Typography as="h4">Dados da Requisição</Typography>
                    <Divider fullWidth borderColor={colors.colors.gray.light} />
                    <br />
                    <FlexBox noPadding>
                        <Typography as="h5" customStyles={{ marginBottom: '5px' }}>
                            Tipo de Requisição:
                        </Typography>
                        <Typography as="small" variant="secondary" customStyles={{ marginBottom: '5px' }}>
                            {newPR.type}
                        </Typography>
                    </FlexBox>
                    <br />
                    <FlexBox noPadding>
                        <Typography as="h5" customStyles={{ marginBottom: '5px' }}>
                            Objetivo de Requisição:
                        </Typography>
                        <Typography as="small" variant="secondary">
                            {newPR.requisitionGoal}
                        </Typography>
                    </FlexBox>
                    <br />
                    {newPR.productList?.[0] && (
                        <>
                            <Typography as="h4">Organização de Compras</Typography>
                            <Divider fullWidth borderColor={colors.colors.gray.light} />
                            <FlexBox noPadding>
                                <Typography as="h6" customStyles={{ marginBottom: '5px' }}>
                                    Nome:
                                    <Typography as="small" variant="secondary" customStyles={{ margin: '10px' }}>
                                        {userPO?.name}
                                    </Typography>
                                </Typography>
                                <br />
                                <Typography as="h6" customStyles={{ marginBottom: '5px' }}>
                                    Local de Entrega:
                                </Typography>
                                <Typography as="small" variant="secondary" customStyles={{ marginTop: '5px' }}>
                                    {userPO?.center?.street},{userPO?.center?.city},{userPO?.center?.state},
                                    {userPO?.center?.country},{userPO?.center?.zipCode},
                                </Typography>
                                <br />
                                <Typography as="h6" customStyles={{ marginBottom: '5px' }}>
                                    Grupo de Compra:
                                </Typography>
                                <Typography as="small" variant="secondary" customStyles={{ marginTop: '5px' }}>
                                    {userPO?.groups?.name}
                                </Typography>
                            </FlexBox>
                        </>
                    )}
                </Col>
                <Col size={9}>
                    {newPR.productList?.[0] ? (
                        <ProductsTable productList={newPR.productList} />
                    ) : (
                        <EmptyCard
                            title="Ainda não há informações de produtos para esta requisição"
                            subtitle="Continue por adicionar produtos no botão acima"
                            full
                        />
                    )}
                </Col>
            </Row>
            <Divider fullWidth borderColor={colors.colors.gray.lighter} />
            <Row customStyles={{ width: '100%', marginBottom: 10 }}>
                <FlexBox direction="row" verticalAlign="flex-end" horizontalAlign="flex-end" noPadding fullWidth>
                    <Button
                        style={{ marginRight: '20px', display: 'inline-block' }}
                        size="fluid"
                        variant="secondary"
                        onClick={(): any => handleCancel()}
                    >
                        Cancelar
                    </Button>
                    <Button onClick={(): any => handleSubmit()} size="fluid" variant="primary">
                        Criar Requisição
                    </Button>
                </FlexBox>
            </Row>
        </>
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default NewPurchaseRequisitionRequest;
