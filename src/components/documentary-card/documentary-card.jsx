import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import './documentary-card.scss';
import { Link } from "react-router-dom";


export class DocumentaryCard extends React.Component {

    render() {
        /*const imageClick = () => {
            window.open(`/documentaries/${documentary._id}`, '_self')
    }*/



        const { documentary, user } = this.props;

        return (
            <Container fluid id="documentary-card-id" className="fluid documentary-card d-flex" /*onClick={() => imageClick()}*/ >
                <div className="card h-100 image-container d-flex">
                    <Card className="card-color" /*style={{ width: '30rem'/*, height: '45rem'  }}*/>
                        <Card.Img /*style={{ width: '30rem', height: '45rem' }}*/ className="card-poster" variant="top" src={documentary.ImagePath} />
                        <div className="fluid overlay d-flex align-items-center">
                            <Card.Body className="documentary-card-body">
                                <Card.Title className="documentary-card-title">{documentary.Title}</Card.Title>
                                <Card.Text>{documentary.Description}</Card.Text>
                                <Link to={`/documentaries/${documentary._id}`}>
                                    <Button className="detail-button" variant="link">Details</Button>
                                </Link>
                            </Card.Body>
                        </div>
                    </Card>
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