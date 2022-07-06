import React from 'react';
import PropTypes from 'prop-types';


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
                <div className="documentary-release">
                    <span className="label">Release year: </span>
                    <span className="value">{documentary.ReleaseYear}</span>
                </div>
                <div className="documentary-release">
                    <span className="label">Genre: </span>
                    <span className="value">{documentary.Genre.Name}</span>
                </div>
                <div className="documentary-personality">
                    <span className="label">Featured personality: </span>
                    <span className="value">{documentary.FeaturedPersonality.Name}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>

            </div>
        );
    }
}

DocumentaryView.propTypes = {
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