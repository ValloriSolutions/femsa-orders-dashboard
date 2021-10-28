/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Row,
    Col,
    colors,
    FlexBox,
    Dropdown,
    DropdownItem,
} from '@vallorisolutions/foa-design-system';
import ReactLoading from 'react-loading';
import React, { useState } from 'react';
import { ProductProps } from '../../../mocks/entities';
import { useModals } from '../../../helpers/modals';
import { useDispatch } from 'react-redux';
import { setProductList } from '../../../store/modules/purchaseRequisition/actions';
import NewProductsForm from '../NewProductsForm';

interface Props {
    productList: ProductProps[];
}

const ProductsTable: React.FC<Props> = ({ productList }): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { openProductDialog } = useModals(<NewProductsForm />);

    const removeProduct = (id: number) => {
        setIsLoading(true);
        const newValues: ProductProps[] = productList.filter((product) => product.id !== id);
        dispatch(setProductList(newValues));
        setIsLoading(false);
    };

    console.log(productList, 'productList');
    return !isLoading && productList.length > 0 ? (
        <>
            <Row customStyles={{ width: '100%', height: '100%' }}>
                <Col>
                    <Table
                        cardCustomStyles={{ padding: '20px' }}
                        topToolbar={<Typography as="h6">Produtos adicionados</Typography>}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" order={'DESC'} orderBy={'id'} width="150px">
                                    Código
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'type'} width="200px">
                                    Material
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'type'} width="200px">
                                    Grupo de Materiais
                                </TableCell>
                                <TableCell component="th" order={'DESC'} orderBy={'requisitionGoal'} width="50px">
                                    Quantidade
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'status'}>
                                    Avaliação
                                </TableCell>
                                <TableCell component="th" order={'ASC'} orderBy={'submittedToSenniorAt'}>
                                    Pessoa de Contato
                                </TableCell>
                                <TableCell component="th">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productList.map((product: ProductProps) => (
                                <TableRow key={product.id}>
                                    <TableCell component="td">{product.code}</TableCell>
                                    <TableCell component="td">{product.material}</TableCell>
                                    <TableCell component="td"> {product.materialGroup}</TableCell>
                                    <TableCell component="td">{product.qtyRequested}</TableCell>
                                    <TableCell component="td">R${product.valuationPrice}</TableCell>
                                    <TableCell component="td">{product.createdBy}</TableCell>
                                    <TableCell actionCell>
                                        <Dropdown threeDots>
                                            <DropdownItem onClick={() => openProductDialog()}>
                                                Editar Produto
                                            </DropdownItem>
                                            <DropdownItem onClick={() => removeProduct(product.id)}>
                                                Remover Produto
                                            </DropdownItem>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Col>
            </Row>
            <br />
            <br />
            <br />
        </>
    ) : (
        <FlexBox fullHeight fullWidth verticalAlign="center" horizontalAlign="center">
            <ReactLoading type="spinningBubbles" color={colors.red} />
        </FlexBox>
    );
};

export default ProductsTable;
