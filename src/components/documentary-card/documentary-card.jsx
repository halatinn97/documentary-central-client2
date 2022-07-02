import React from 'react';


export class DocumentaryCard extends React.Component {
    render() {
        const { documentary, onDocumentaryClick } = this.props;
        return <div className="documentary-card" onClick={() => { onDocumentaryClick(documentary); }}>{documentary.Title}</div>;
    }
}