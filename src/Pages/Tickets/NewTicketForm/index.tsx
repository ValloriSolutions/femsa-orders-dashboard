/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uuid } from '../../../helpers/utils';
import { Button, Input, Select, Typography } from '@vallorisolutions/foa-design-system';
import RichTextEditor from '../../../components/Editor/Editor';

const intialValues = {
    id: uuid(),
    title: '',
    orderNumber: 0,
    subject: '',
    status: null,
    operatorName: '',
    supplierName: '',
    opennedAt: new Date(),
    updatedAt: new Date(),
};

const NewTicketForm: React.FC = (): JSX.Element => {
    const orderNumberOptions = [
        { id: 1, name: `#${uuid()} - Reval – Atacado de Papelaria` },
        { id: 2, name: `#${uuid()} - Eggplant - Asian` },
        { id: 3, name: `#${uuid()} - Plasticforkblack LTDA.` },
    ];
    const fornecedorOptions = ['Reval – Atacado de Papelaria', 'Eggplant - Asian.', 'Plasticforkblack LTDA.'];
    const subjectOptions = [
        { id: 1, name: 'Duvidas' },
        { id: 2, name: 'Orçamento Personalizado' },
        { id: 3, name: 'Reclamações' },
    ];
    const formik = useFormik({
        initialValues: {
            title: intialValues.title,
            orderNumber: intialValues.orderNumber,
            subject: intialValues.subject,
            message: intialValues.subject,
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Digite um Titulo para seu ticket'),
            subject: Yup.string().required('Escolha um assunto'),
            orderNumber: Yup.string().required('Escolha uma ordem de serviço'),
            message: Yup.string().required('Digite uma mensagem'),
        }),
        onSubmit: () => undefined,
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ marginLeft: '-5px', width: '100%' }}>
            <Input
                label="Titulo"
                placeholder="Digite um titulo para seu ticket"
                value={formik.values.title}
                onChange={(e): any => formik.setFieldValue('title', e.target.value)}
            />
            <br />
            <Select
                label="Numero da Ordem de Requisição"
                placeholder="-- Escolha um --"
                value={formik.values.orderNumber}
                setValue={(e): any => formik.setFieldValue('orderNumber', e)}
                options={orderNumberOptions}
            />
            {formik.values.orderNumber ? (
                <Typography as="small" variant="secondary" customStyles={{ margin: 5, display: 'inline-block' }}>
                    Uma notificação de nova requisição será enviada ao Fornecedor
                    {fornecedorOptions[formik.values.orderNumber - 1]}
                </Typography>
            ) : null}
            <br />
            <Select
                label="Assunto Principal"
                placeholder="-- Escolha um --"
                value={formik.values.subject}
                setValue={(e): any => formik.setFieldValue('subject', e)}
                options={subjectOptions}
            />
            <br />
            <Typography as="label">Digite sua mensagem</Typography>
            <div style={{ padding: '10px' }}>
                <RichTextEditor />
            </div>
            <br />
            <Button size="full" variant="primary" onClick={(): any => formik.submitForm}>
                Enviar Solicitação
            </Button>
        </form>
    );
};

export default NewTicketForm;
