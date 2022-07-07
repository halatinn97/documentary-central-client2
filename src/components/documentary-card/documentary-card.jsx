import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import './documentary-card.scss';


export class DocumentaryCard extends React.Component {
    render() {

        const { documentary, onDocumentaryClick } = this.props;

        return (
            <Container className="documentary-card">
                <Card>
                    <Card.Img variant="top" src={documentary.ImagePath} />
                    <Card.Body>
                        <Card.Title>{documentary.Title}</Card.Title>
                        <Card.Text>{documentary.Description}</Card.Text>
                        <Button onClick={() => onDocumentaryClick(documentary)} variant="link">Open</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
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