import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import './index.scss';


// Main component (will eventually use all the others)
class DocumentaryCentralApplication extends React.Component {
    render() {
        return (
            <Container>
                <MainView />
            </Container>
        );
    }
}

// Finds the root of app
const container = document.getElementsByClassName('app-container')[0];

const root = ReactDOM.createRoot(container);

root.render(<DocumentaryCentralApplication />);

