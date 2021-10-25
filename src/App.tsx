import React from 'react';
import { Provider } from 'react-redux';
import DialogContainer from './components/DialogContainer';
import Navigation from './routes/Navigation';
import store from './store';

const App: React.FC = (): JSX.Element => {
    return (
        <>
            <Provider store={store}>
                <DialogContainer />
                <Navigation />
            </Provider>
        </>
    );
};

export default App;
