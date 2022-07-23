import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import './documentary-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';




export class DocumentaryView extends React.Component {


    //Remove docu from favorites
    addFav = (documentaryId) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.post(`https://documentary-central.herokuapp.com/users/${user}/documentaries/${documentaryId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert('The documentary has been deleted from your favorites list.')
                window.open(`/users/${user}`, '_self');
            })
            .catch(error => {
                console.log(error)
            });
    }


    //Remove docu from favorites
    removeFav = (documentaryId) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios.delete(`https://documentary-central.herokuapp.com/users/${user}/documentaries/${documentaryId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert('The documentary has been deleted from your favorites list.')
                window.open(`/users/${user}`, '_self');
            })
            .catch(error => {
                console.log(error)
            });
    }


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
                        <Button
                            className="add-favorites ml-2 my-2"
                            onClick={() => this.addFav(documentary._id)}
                        >
                            Add to Favorites
            </Button>
                        <Button
                            className="remove-favorites ml-2"
                            onClick={() => this.removeFav(documentary._id)}
                        >
                            Remove from Favorites
            </Button>
                    </Card.Body>
                </Card>
            </Container>

        );
    }
}


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
