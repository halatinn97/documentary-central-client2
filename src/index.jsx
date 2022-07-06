import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class DocumentaryCentralApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

const root = ReactDOM.createRoot(container);
root.render(<DocumentaryCentralApplication />);

/* Tells React to render your app in the root DOM element
ReactDOM.createRoot(DocumentaryCentralApplication, container);*/