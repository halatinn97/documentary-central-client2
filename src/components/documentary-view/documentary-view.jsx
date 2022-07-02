import React from 'react';

export class DocumentaryView extends React.Component {

    render() {
        const { documentary, onBackClick } = this.props;

        return (
            <div className="documentary-view">
                <div className="documentary-poster">
                    <img src={documentary.ImagePath} />
                </div>
                <div className="documentary-title">
                    <span className="label">Title: </span>
                    <span className="value">{documentary.Title}</span>
                </div>
                <div className="documentary-description">
                    <span className="label">Description: </span>
                    <span className="value">{documentary.Description}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}