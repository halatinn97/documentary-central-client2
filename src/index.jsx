import React from 'react';
import * as ReactDOM from 'react-dom/client';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DocumentariesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import './index.scss';

const store = createStore(DocumentariesApp, devToolsEnhancer());


// Main component (will eventually use all the others)
class DocumentaryCentralApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of app
const container = document.getElementsByClassName('app-container')[0];

const root = ReactDOM.createRoot(container);

root.render(<DocumentaryCentralApplication />);

