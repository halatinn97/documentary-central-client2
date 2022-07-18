import React from 'react';
import { Card } from 'react-bootstrap';
import './genre-view.scss';
import PropTypes from 'prop-types';


export class GenreView extends React.Component {

    render() {
        const { genre } = this.props;

        return (

            <Card text='dark' className="genre-view">
                <Card.Header>Genre: {genre.Name}</Card.Header>
                <Card.Body>
                    <Card.Text>Description: {genre.Description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

}


GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};
