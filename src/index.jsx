import React from 'react';
import * as ReactDOM from 'react-dom/client';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
/*import ReactDOM from 'react-dom';*/
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import DocumentariesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import './styles/base.scss';

const store = createStore(DocumentariesApp, devToolsEnhancer());

class DocumentaryCentralApplication extends React.Component {
    render() {
        return (

            <Provider store={store}>
                <Container fluid>
                    <MainView className="main-view-style" />
                </Container>
            </Provider>


        );
    }
}


const container = document.getElementsByClassName('app-container')[0];

const root = ReactDOM.createRoot(container);

root.render(<DocumentaryCentralApplication />);

