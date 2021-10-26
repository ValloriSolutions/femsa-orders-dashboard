/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uuid } from '../../../helpers/utils';
import { Button, FlexBox, OrderType, Select, Typography } from '@vallorisolutions/foa-design-system';
import RichTextEditor from '../../../components/Editor/Editor';
import { useDispatch } from 'react-redux';
import { resetDialog } from '../../../store/modules/layout/actions';

const intialValues = {
    id: uuid(),
    type: '',
    requisitionGoal: '',
};

const NewRequestForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const handleClose = (): void => {
        dispatch(resetDialog());
    };
    const typeOptions = Object.values(OrderType).map((type, index) => ({
        id: index + 1,
        name: type,
    }));

    const formik = useFormik({
        initialValues: {
            type: intialValues.type,
            requisitionGoal: intialValues.requisitionGoal,
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Digite um Titulo para seu ticket'),
            subject: Yup.string().required('Escolha um assunto'),
        }),
        onSubmit: () => undefined,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginLeft: '-5px', minWidth: '600px', textAlign: 'left' }}>
            <br />
            <Select
                label="Tipo de Requisição"
                placeholder="-- Escolha um --"
                value={formik.values.type}
                setValue={(e): any => formik.setFieldValue('type', e)}
                options={typeOptions}
            />
            <br />
            <Typography as="label">Qual a Finalidade desta requisição?</Typography>
            <div style={{ padding: '10px' }}>
                <RichTextEditor />
            </div>
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
                <Button size="fluid" small variant="primary" onClick={(): any => formik.submitForm}>
                    Próximo
                </Button>
            </FlexBox>
        </form>
    );
};

export default NewRequestForm;
