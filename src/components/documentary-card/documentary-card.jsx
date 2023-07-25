import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import './documentary-card.scss';
import { Link } from "react-router-dom";


export class DocumentaryCard extends React.Component {

    render() {
        const imageClick = () => {
            window.open(`/documentaries/${documentary._id}`, '_self')
        }



        const { documentary, user } = this.props;

        return (
            <Container id="documentary-card-id" className="container-fluid content-row" onClick={() => imageClick()} >
                <div className="row">
                    <div className="col">
                        <div className="card h-100">
                            <Card className="documentary-card card h-100">
                                <div className="image-container">
                                    <Card.Img variant="top" src={documentary.ImagePath} />
                                    <div className="overlay fluid d-flex align-items-center">
                                        <Card.Body className="documentary-card-body">
                                            <Link to={`/documentaries/${documentary._id}`}>
                                                <Button className="detail-button" variant="link">Click for more</Button>
                                            </Link>
                                        </Card.Body>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>


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