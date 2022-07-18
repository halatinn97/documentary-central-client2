import React from 'react';
import { Card } from 'react-bootstrap';
import './personality-view.scss';
import PropTypes from 'prop-types';



export class PersonalityView extends React.Component {

    render() {
        const { featuredPersonality } = this.props;

        return (
            <Card text='dark' className="personality-view">
                <Card.Header>{featuredPersonality.Name}</Card.Header>
                <Card.Body>
                    <Card.Text> Biography: {featuredPersonality.Biography}</Card.Text>
                    <Card.Text> Birth: {featuredPersonality.Birth}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

PersonalityView.propTypes = {
    documentary: PropTypes.shape({
        FeaturedPersonality: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Birth: PropTypes.number.isRequired,
            Biography: PropTypes.string.isRequired
        }),
    }).isRequired
};