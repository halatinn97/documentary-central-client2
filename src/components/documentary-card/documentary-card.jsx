import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import './documentary-card.scss';
import { Link } from "react-router-dom";


export class DocumentaryCard extends React.Component {
    render() {

        const { documentary, user } = this.props;

        return (
            <Container className="documentary-card">
                <Card>
                    <Card.Img variant="top" src={documentary.ImagePath} />
                    <Card.Body>
                        <Card.Title>{documentary.Title}</Card.Title>
                        <Card.Text>{documentary.Description}</Card.Text>
                        <Link to={`/documentaries/${documentary._id}`}>
                            <Button variant="link">Open</Button>
                        </Link>
                        <Link to={`users/${user}/documentaries/${documentary._id}`}>
                            <Button variant="link">Add to 💙</Button>
                        </Link>
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
    }).isRequired
};