import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import DialogContainer from '../components/DialogContainer';
import PageLayout from '../components/PageLayout';
import Dashboard from '../Pages/Dashboard';
import GenerateOrder from '../Pages/GenerateOrder';
import LoginPage from '../Pages/Login';
import NewPurchaseRequisitionRequest from '../Pages/NewPurchaseRequisitionRequest';
import OrderRequest from '../Pages/OrderRequest';
import OrderRequests from '../Pages/OrderRequests';
import OrderSummary from '../Pages/OrderSummary';
import Quotes from '../Pages/Quotes';
import RFQ from '../Pages/RFQ';
import Ticket from '../Pages/Ticket';
import Tickets from '../Pages/Tickets';

const Navigation: React.FC = (): JSX.Element => {
    const idToken = localStorage.getItem('isAuth') || '';
    console.log(idToken, 'idToken');
    return (
        <Router>
            {idToken === 'true' ? (
                <>
                    <DialogContainer />
                    <div className="contacts">
                        <style>{`@media print {.contacts{display: none;}}`}</style>

                        <PageLayout>
                            <Switch>
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>
                                <Route exact path="/requisicoes-de-compra">
                                    <OrderRequests />
                                </Route>
                                <Route exact path="/requisicoes-de-compra/:id">
                                    <OrderRequest />
                                </Route>
                                <Route exact path="/requisicoes-de-compra/nova/:id">
                                    <NewPurchaseRequisitionRequest />
                                </Route>
                                <Route exact path="/ordem-gerada/:id">
                                    <GenerateOrder />
                                </Route>
                                <Route exact path="/solicitar-cotação/:id">
                                    <RFQ />
                                </Route>
                                <Route exact path="/quotes">
                                    <Quotes />
                                </Route>
                                <Route exact path="/resumo-ordem-compra">
                                    <OrderSummary />
                                </Route>
                                <Route exact path="/tickets">
                                    <Tickets />
                                </Route>
                                <Route exact path="/ticket/:id">
                                    <Ticket />
                                </Route>
                            </Switch>
                        </PageLayout>
                    </div>
                </>
            ) : (
                <Switch>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>

                    <Redirect to="/login" />
                </Switch>
            )}
        </Router>
    );
};

export default Navigation;
