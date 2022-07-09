import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './documentary-view.scss';

export class DocumentaryView extends React.Component {

    render() {
        const { documentary } = this.props;

        return (
            <Container className="documentary-view">
                <Row className="documentary-poster">
                    <img src={documentary.ImagePath} />
                </Row>
                <Row className="documentary-title">
                    <Col className="label">Title: </Col>
                    <Col className="value">{documentary.Title}</Col>
                </Row>
                <Row className="documentary-description">
                    <Col className="label">Description: </Col>
                    <Col className="value">{documentary.Description}</Col>
                </Row>
                <Row className="documentary-release">
                    <Col className="label">Release year: </Col>
                    <Col className="value">{documentary.ReleaseYear}</Col>
                </Row>
                <Row className="documentary-release">
                    <Col className="label">Genre: </Col>
                    <Col className="value">{documentary.Genre.Name}</Col>
                </Row>
                <Row className="documentary-personality">
                    <Col className="label">Featured personality: </Col>
                    <Col className="value">{documentary.FeaturedPersonality.Name}</Col>
                </Row>
                <Link to={`/featuredPersonalities/${documentaries.featuredPersonality.Name}`}>
                    <Button variant="link">Featured Personality</Button>
                </Link>

                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>
            </Container>

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