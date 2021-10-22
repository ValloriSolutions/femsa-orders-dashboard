import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Dashboard from '../Pages/Dashboard';
import GenerateOrder from '../Pages/GenerateOrder';
import NewOrderRequest from '../Pages/NewOrderRequest';
import OrderRequest from '../Pages/OrderRequest';
import OrderRequests from '../Pages/OrderRequests';
import OrderSummary from '../Pages/OrderSummary';
import Quotes from '../Pages/Quotes';
import RFQ from '../Pages/RFQ';
import Ticket from '../Pages/Ticket';
import Tickets from '../Pages/Tickets';

const Navigation: React.FC = (): JSX.Element => {
    const idToken = true;
    return (
        <Router>
            {idToken ? (
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
                        <Route exact path="/requisicoes-de-compra/nova">
                            <NewOrderRequest />
                        </Route>
                        <Route exact path="/gerar-ordem">
                            <GenerateOrder />
                        </Route>
                        <Route exact path="/criar-rqf">
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
            ) : (
                <Redirect to="/login" />
            )}
        </Router>
    );
};

export default Navigation;
