import React from 'react';
import { DocumentaryCard } from '../documentary-card/documentary-card';
import { DocumentaryView } from '../documentary-view/documentary-view';
import axios from 'axios';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            documentaries: [],
            selectedDocumentary: null
        };
    }

    componentDidMount() {
        axios.get('https://documentary-central.herokuapp.com/documentaries')
            .then(response => {
                this.setState({
                    documentaries: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedDocumentary(newSelectedDocumentary) {
        this.setState({
            selectedDocumentary: newSelectedDocumentary
        });
    }


    render() {
        const { documentaries, selectedDocumentary } = this.state;

        if (documentaries.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedDocumentary
                    ? <DocumentaryView documentary={selectedDocumentary} onBackClick={newSelectedDocumentary => { this.setSelectedDocumentary(newSelectedDocumentary); }} />
                    : documentaries.map(documentary => (
                        <DocumentaryCard key={documentary._id} documentary={documentary} onDocumentaryClick={(documentary) => { this.setSelectedDocumentary(documentary) }} />
                    ))
                }
            </div>
        );
    }

}
