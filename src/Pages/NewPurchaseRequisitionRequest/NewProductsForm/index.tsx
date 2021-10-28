/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Col,
    colors,
    Divider,
    FlexBox,
    Input,
    Options,
    Row,
    Select,
    Textarea,
    Typography,
} from '@vallorisolutions/foa-design-system';
import { useDispatch, useSelector } from 'react-redux';
import { resetDialog } from '../../../store/modules/layout/actions';
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { ProductProps } from '../../../mocks/entities';
import { uuid } from '../../../helpers/utils';
import { api } from '../../../api';
import { CSSObject } from 'styled-components';
import { setProductList } from '../../../store/modules/purchaseRequisition/actions';
import { RootState } from '../../../store/modules';

const NewProductsForm: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [codeList, setCodeList] = useState<Options[]>([]);
    const { operator, userPO } = useSelector((state: RootState) => state.auth);
    const { productList } = useSelector((state: RootState) => state.purchaseRequisition.newPurchaseRequisitionInfo);

    console.log('userPO', userPO);
    const statusList = [
        { id: 'Devolvido', name: 'Devolvido' },
        { id: 'Liberado', name: 'Liberado' },
        { id: 'Bloqueado', name: ' Bloqueado' },
    ];

    const fetchProducts = async (): Promise<void> => {
        const { data } = await api.get<ProductProps[]>('products');
        setProducts(data);
        setCodeList(
            data.map((product: ProductProps) => ({
                id: product.code,
                name: product.code,
            })),
        );
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleClose = (): void => {
        dispatch(resetDialog());
    };

    const handleSubmit = async (): Promise<void> => {
        const values = formik.values;
        // eslint-disable-next-line prefer-const
        let productListTemp: ProductProps[] | undefined = productList;
        productListTemp?.push(values);
        dispatch(setProductList(productListTemp ?? []));
        formik.resetForm(values);
        handleClose();
    };

    const formik = useFormik({
        initialValues: {
            id: uuid(),
            code: '',
            material: '',
            description: '',
            materialGroup: '',
            qtyRequested: 0,
            deliveryEstimation: '',
            requestDate: '',
            releaseDate: '',
            valuationPrice: 0,
            status: '',
            createdBy: operator?.name,
            modifiedBy: operator?.name,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            type: Yup.string().required('Escolha um typo para sua requisição'),
            requisitionGoal: Yup.string().required('Escolha um assunto'),
        }),
        onSubmit: () => undefined,
    });

    useEffect(() => {
        formik.resetForm();
    }, []);
    const rowStyles = {
        width: '100%',
        marginBottom: '10px',
    };
    const colStyles: CSSObject = {
        marginInline: '10px',
        flexDirection: 'row',
    };

    const handleCodeSelection = (value: string | number): void => {
        const product = products.find((p) => p.code === value);
        if (product) {
            formik.setFieldValue('id', product.id);
            formik.setFieldValue('code', product.code);
            formik.setFieldValue('material', product.material);
            formik.setFieldValue('description', product.description);
            formik.setFieldValue('materialGroup', product.materialGroup);
            formik.setFieldValue('qtyRequested', product.qtyRequested);
            formik.setFieldValue('deliveryEstimation', product.deliveryEstimation);
            formik.setFieldValue('requestDate', product.requestDate);
            formik.setFieldValue('releaseDate', product.releaseDate);
            formik.setFieldValue('valuationPrice', product.valuationPrice);
            formik.setFieldValue('status', product.status);
            formik.setFieldValue('createdBy', product.createdBy);
            formik.setFieldValue('modifiedBy', product.modifiedBy);
            formik.setFieldValue('notes', product.notes);
        }
    };

    return !loading ? (
        <form
            onSubmit={(e): any => e.preventDefault()}
            style={{ marginLeft: '-5px', width: '60vw', textAlign: 'left', marginTop: '30px' }}
        >
            <Row customStyles={rowStyles}>
                <Col size={12} customStyles={colStyles}>
                    <Typography as="h5">Cabeçalho</Typography>
                </Col>
                <Divider fullWidth borderColor={colors.border.disabled} />
                <Col size={2} customStyles={colStyles}>
                    <Select
                        label="Código do Produto"
                        placeholder="Ex. M-E098"
                        value={formik.values.code}
                        setValue={(e): any => handleCodeSelection(e)}
                        options={codeList}
                    />
                </Col>
                <Col size={7} customStyles={colStyles}>
                    <FlexBox noPadding direction="row" fullWidth customStyles={{ justifyContent: 'space-between' }}>
                        <div style={{ marginRight: '20px' }}>
                            <Input
                                label="Material"
                                placeholder=""
                                value={formik.values.material}
                                onChange={(e): any => formik.setFieldValue('material', e.target.value)}
                            />
                        </div>
                        <Input
                            label="Grupo de Materiais"
                            placeholder=""
                            value={formik.values.materialGroup}
                            onChange={(e): any => formik.setFieldValue('materialGroup', e.target.value)}
                        />
                    </FlexBox>
                </Col>
                <Col size={6} customStyles={colStyles}>
                    <Typography as="label" customStyles={{ display: 'block' }}>
                        Descrição:
                    </Typography>
                    <Typography as="small" variant="secondary">
                        {formik.values.description}
                    </Typography>
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col size={12} customStyles={colStyles}>
                    <Typography as="h5">Quantidades e Datas</Typography>
                </Col>
            </Row>
            <Row>
                <Divider fullWidth borderColor={colors.border.disabled} />
                <Col size={2} customStyles={colStyles}>
                    <Input
                        label="Quantidade"
                        placeholder=""
                        value={formik.values.qtyRequested}
                        onChange={(e): any => formik.setFieldValue('qtyRequested', e.target.value)}
                    />
                </Col>
                <Col size={2} customStyles={colStyles}>
                    <Input
                        label="Avaliação de Preço"
                        placeholder=""
                        value={formik.values.valuationPrice}
                        onChange={(e): any => formik.setFieldValue('valuationPrice', e.target.value)}
                    />
                </Col>
                <Col
                    size={2}
                    customStyles={{
                        paddingRight: '20px',
                        borderRight: '1px solid' + colors.border.disabled,
                        ...colStyles,
                    }}
                >
                    <Input
                        label="Data de Requisição"
                        placeholder=""
                        value={formik.values.requestDate}
                        onChange={(e): any => formik.setFieldValue('requestDate', e.target.value)}
                    />
                </Col>
                <Col size={2} customStyles={colStyles}>
                    <Input
                        label="Data de Entrega"
                        placeholder=""
                        value={formik.values.deliveryEstimation}
                        onChange={(e): any => formik.setFieldValue('deliveryEstimation', e.target.value)}
                    />
                </Col>
                <Col size={2} customStyles={colStyles}>
                    <Input
                        label="Data de Liberação"
                        placeholder=""
                        value={formik.values.releaseDate}
                        onChange={(e): any => formik.setFieldValue('releaseDate', e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Divider fullWidth borderColor={colors.border.disabled} />
                <Col size={4} customStyles={colStyles}>
                    <Select
                        label="Status"
                        placeholder="-- escolha um --"
                        value={formik.values.status}
                        setValue={(e): any => formik.setFieldValue('status', e)}
                        options={statusList}
                    />
                </Col>
                <Col size={4} customStyles={colStyles}>
                    <Input
                        label="Criado por"
                        placeholder=""
                        value={formik.values.createdBy}
                        onChange={(e): any => formik.setFieldValue('createdBy', e.target.value)}
                    />
                </Col>
                <Col size={4} customStyles={colStyles}>
                    <Input
                        label="Modificado por"
                        placeholder=""
                        value={formik.values.modifiedBy}
                        onChange={(e): any => formik.setFieldValue('modifiedBy', e.target.value)}
                    />
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col size={12} customStyles={colStyles}>
                    <Textarea
                        style={{ height: '40px' }}
                        label="Observações"
                        placeholder=""
                        value={formik.values.notes}
                        onChange={(e): any => formik.setFieldValue('notes', e.target.value)}
                    />
                </Col>
            </Row>
            <FlexBox direction="row" verticalAlign="flex-end" horizontalAlign="flex-end" noPadding>
                <Button
                    style={{ marginRight: '20px', display: 'inline-block' }}
                    size="fluid"
                    small
                    variant="secondary"
                    onClick={(): any => handleClose()}
                >
                    Cancelar
                </Button>
                <Button onClick={(): any => handleSubmit()} size="fluid" small type="submit" variant="primary">
                    Próximo
                </Button>
            </FlexBox>
        </form>
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default NewProductsForm;
