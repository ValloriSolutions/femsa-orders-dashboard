/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, colors, Divider, FlexBox, Row, Typography } from '@vallorisolutions/foa-design-system';
import React from 'react';
import { useUrl } from '../../helpers/utils';
import TitleOrderGenerated from './title';

const GenerateOrder: React.FC = (): JSX.Element => {
    const { params, navigate } = useUrl();
    console.log(params);
    return (
        <>
            <Row customStyles={{ marginBottom: 40 }}>
                <Col>
                    <Typography as="h1">Gerar Requisição de Compra</Typography>
                </Col>
            </Row>
            <Card fullHeight fullWidth customStyles={{ marginBottom: 40 }}>
                <Row>
                    <Col>
                        <TitleOrderGenerated />
                        <br />
                        <br />
                        <br />
                        <br />
                        <Typography as="h2">Requisição de número #934857435{/* {params.id} */}</Typography>
                        <br />
                        <br />
                        <br />
                        <br />
                    </Col>
                </Row>
                <Divider fullWidth borderColor={colors.colors.gray.lighter} />
                <Row customStyles={{ width: '100%', marginBottom: 10 }}>
                    <FlexBox direction="row" verticalAlign="center" horizontalAlign="center" noPadding fullWidth>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Button
                            style={{ marginRight: '20px', display: 'inline-block' }}
                            size="fluid"
                            variant="secondary"
                            onClick={(): any => navigate('/requisicoes-de-compra')}
                        >
                            Voltar para requisições de compra
                        </Button>
                        <Button onClick={(): any => navigate()} size="fluid" variant="primary">
                            Imprimir Requisição e mudar o status para &quot;Aguardando aprovação&quot;
                        </Button>
                    </FlexBox>
                </Row>
            </Card>
        </>
    );
};

export default GenerateOrder;
