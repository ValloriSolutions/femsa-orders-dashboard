/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Typography, FlexBox, colors, Divider } from '@vallorisolutions/foa-design-system';
import EmptyCard from '../../components/EmptyCard';
import ReactLoading from 'react-loading';
import { setRefreshList } from '../../store/modules/layout/actions';
import { PurchaseRequisitionProps } from '../../mocks/entities';
import { RootReducer } from '../../store/modules';
import ProductsTable from './ProductsTable';
import { AuthState } from '../../store/modules/auth/types';

const NewPurchaseRequisitionRequest: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const newPR: PurchaseRequisitionProps = useSelector(
        (state: RootReducer) => state.purchaseRequisition.newPurchaseRequisitionInfo,
    );
    const { userPO }: AuthState = useSelector((state: RootReducer) => state.auth);

    useEffect(() => {
        dispatch(setRefreshList());
    }, []);

    return newPR.type ? (
        <>
            <Row customStyles={{ width: '100%', height: '100%' }}>
                <Col size={4} customStyles={{ paddingRight: '30px' }}>
                    <Divider fullWidth borderColor={colors.colors.gray.lighter} />
                    <Typography as="h4">Resumo da Requisição</Typography>
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
        </>
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default NewPurchaseRequisitionRequest;
