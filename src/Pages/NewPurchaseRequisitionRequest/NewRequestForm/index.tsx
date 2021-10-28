/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FlexBox, Select, Textarea } from '@vallorisolutions/foa-design-system';
import { useDispatch } from 'react-redux';
import { resetDialog } from '../../../store/modules/layout/actions';
import { useEffect } from 'react';
import { setPRInfo } from '../../../store/modules/purchaseRequisition/actions';
import { OrderType } from '../../../mocks/entities';
import { useUrl, uuid } from '../../../helpers/utils';

const NewRequestForm: FC = (): JSX.Element => {
    const id = useMemo(() => uuid(), []);
    const dispatch = useDispatch();
    const { navigate } = useUrl();
    useEffect(() => {
        dispatch(setPRInfo({ id }));
    }, []);

    const handleClose = (): void => {
        dispatch(resetDialog());
    };
    const [typeValue, setTypeValue] = useState<string | number>('');

    useEffect(() => {
        formik.setFieldValue('type', typeValue);
        dispatch(setPRInfo({ type: typeValue }));
    }, [typeValue]);

    const typeOptions = Object.values(OrderType)
        .filter((e) => typeof e === 'string')
        .map((type) => ({
            id: String(type),
            name: String(type),
        }));
    const handleSubmit = async (): Promise<void> => {
        const values = formik.values;
        await dispatch(setPRInfo({ requisitionGoal: values.requisitionGoal }));
        formik.resetForm();
        handleClose();
        navigate(`/requisicoes-de-compra/nova/${id}`);
    };

    const formik = useFormik({
        initialValues: {
            type: typeValue,
            requisitionGoal: '',
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

    return (
        <form
            onSubmit={(e): any => e.preventDefault()}
            style={{ marginLeft: '-5px', minWidth: '600px', textAlign: 'left' }}
        >
            <br />
            <Select
                name="type"
                label="Tipo de Requisição"
                placeholder="-- Escolha um --"
                value={typeValue}
                setValue={(e): void => setTypeValue(e)}
                options={typeOptions}
            />
            <br />
            <Textarea
                name="requisitionGoal"
                label="Qual a Finalidade desta requisição?"
                placeholder="Ex. Reposição de canetas..."
                value={formik.values.requisitionGoal}
                onChange={(e): any => formik.handleChange(e)}
            />
            <br />
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
    );
};

export default NewRequestForm;
