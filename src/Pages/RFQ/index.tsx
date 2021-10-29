/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, FlexBox, Row, StepBar, Typography } from '@vallorisolutions/foa-design-system';
import React from 'react';
import { useUrl } from '../../helpers/utils';
import NewPurchaseRequisitionRequest from '../NewPurchaseRequisitionRequest/minimal';

const RFQ: React.FC = (): JSX.Element => {
    const { navigate } = useUrl();
    return (
        <>
            <Row customStyles={{ marginBottom: 40 }}>
                <Col>
                    <Typography as="h1">Solicitação de Cotação</Typography>
                </Col>
            </Row>
            <br />
            <br />
            <div style={{ width: '50%', margin: 'auto' }}>
                <StepBar currentStep={1} total={3} />
            </div>
            <br />
            <br />
            <br />
            <Card>
                <NewPurchaseRequisitionRequest />
            </Card>
            <br />
            <FlexBox direction="row" verticalAlign="center" horizontalAlign="center" noPadding fullWidth>
                <Button
                    style={{ marginRight: '20px', display: 'inline-block' }}
                    size="fluid"
                    variant="secondary"
                    onClick={(): any => navigate('/requisicoes-de-compra')}
                >
                    Voltar para requisições de compra
                </Button>
                <Button onClick={(): any => navigate('/tickets')} size="fluid" variant="primary">
                    Continuar para a próxima etapa
                </Button>
            </FlexBox>
        </>
    );
};

export default RFQ;
