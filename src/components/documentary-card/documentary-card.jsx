import React from 'react';
import PropTypes from 'prop-types';


export class DocumentaryCard extends React.Component {
    render() {
        const { documentary, onDocumentaryClick } = this.props;
        return <div className="documentary-card" onClick={() => { onDocumentaryClick(documentary); }}>{documentary.Title}</div>;
    }
}


DocumentaryCard.propTypes = {
    documentary: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.number.isRequired,
        Featured: PropTypes.bool,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        FeaturedPersonality: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Birth: PropTypes.number.isRequired,
            Biography: PropTypes.string.isRequired
        }),
    }).isRequired,
    onDocumentaryClick: PropTypes.func.isRequired
};