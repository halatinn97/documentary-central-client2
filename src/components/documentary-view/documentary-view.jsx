import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import './documentary-view.scss';
import { Link } from 'react-router-dom';


export class DocumentaryView extends React.Component {

    render() {
        const { documentary, user } = this.props;

        return (
            <Container className="documentary-view">
                <Card className="documentary-view">
                    <Card.Img
                        className="documentary-poster"
                        img src={documentary.ImagePath}
                    />
                    <Card.Body>
                        <Row className="documentary-title">
                            <Col>
                                <Card.Subtitle className="label">
                                    Title:
                            </Card.Subtitle>
                            </Col>
                            <Col className="value">{documentary.Title}</Col>
                        </Row>
                        <Row className="documentary-description">
                            <Col>
                                <Card.Subtitle className="label" >
                                    Description:
                                </Card.Subtitle>
                            </Col>
                            <Col className="value">{documentary.Description}</Col>
                        </Row>
                        <Row className="documentary-release">
                            <Col>
                                <Card.Subtitle className="label">
                                    Release year:
                            </Card.Subtitle>
                            </Col>
                            <Col className="value">{documentary.ReleaseYear}</Col>
                        </Row>
                        <Row className="documentary-release">
                            <Col>
                                <Card.Subtitle className="label">
                                    Genre:
                            </Card.Subtitle>
                            </Col>
                            <Col className="value">
                                <Link to={`/genres/${documentary.Genre.Name}`}>
                                    {documentary.Genre.Name}
                                </Link>
                            </Col>
                        </Row>
                        <Row className="documentary-personality">
                            <Col>
                                <Card.Subtitle className="label">
                                    Featured personality:
                                </Card.Subtitle>
                            </Col>
                            <Col className="value">
                                <Link className="hover-link" to={`/featuredPersonalities/${documentary.FeaturedPersonality.Name}`}>
                                    {documentary.FeaturedPersonality.Name}
                                </Link>
                            </Col>
                        </Row>
                        <Link to={`users/${user}/documentaries/${documentary._id}`}>
                            <Button variant="link">Add to 💙</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>

        );
    }
}

/*
DocumentaryView.propTypes = {
    documentary: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
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
    }).isRequired
};
*/