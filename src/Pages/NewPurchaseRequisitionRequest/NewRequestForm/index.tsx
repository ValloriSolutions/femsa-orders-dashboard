/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, FlexBox, Select, Textarea } from '@vallorisolutions/foa-design-system';
import { useDispatch } from 'react-redux';
import { resetDialog } from '../../../store/modules/layout/actions';
import { useEffect } from 'react';
// import { setPRInfo } from '../../../store/modules/purchaseRequisition/actions';
import { OrderType } from '../../../mocks/entities';

const NewRequestForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const handleClose = (): void => {
        dispatch(resetDialog());
    };
    const [typeValue, setTypeValue] = useState<string | number>('');

    useEffect(() => {
        formik.setFieldValue('type', typeValue);
    }, [typeValue]);

    const typeOptions = Object.values(OrderType)
        .filter((e) => typeof e === 'string')
        .map((type) => ({
            id: String(type),
            name: String(type),
        }));

    const formik = useFormik({
        initialValues: {
            type: typeValue,
            requisitionGoal: '',
        },
        validationSchema: Yup.object().shape({
            type: Yup.string().required('Escolha um typo para sua requisição'),
            requisitionGoal: Yup.string().required('Escolha um assunto'),
        }),
        onSubmit: (/*values*/) => {
            //dispatch(setPRInfo(values));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginLeft: '-5px', minWidth: '600px', textAlign: 'left' }}>
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
                <Button size="fluid" small type="submit" variant="primary">
                    Próximo
                </Button>
            </FlexBox>
        </form>
    );
};

export default NewRequestForm;
