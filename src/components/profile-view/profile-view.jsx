import React, { useEffect, useState, Fragment } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './profile-view.scss';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { DocumentaryCard } from '../documentary-card/documentary-card';
import moment from 'moment';


export function ProfileView({ documentaries }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [favoriteDocumentaries, setfavoriteDocumentaries] = useState([]);

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');


    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username is required');
            isReq = false;
        } else if (username.length < 5) {
            setUsernameErr('Username must be at least 5 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password is required');
            isReq = false;
        } else if (password.length < 5) {
            setPasswordErr('Password must be at least 5 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email is required');
            isReq = false;
        } else if (email.indexOf("@") === -1) {
            setEmailErr('Email is invalid');
            isReq = false;
        }

        return isReq;
    };

    //Show user profile
    const getUser = () => {
        axios
            .get(`https://documentary-central.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log('Hello', response.data)
                setUsername(response.data.Username);
                setEmail(response.data.Email);
                setBirthday(response.data.Birthday);
                setfavoriteDocumentaries(response.data.FavoriteDocumentaries);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    useEffect(() => {
        getUser()
    }, [])

    //Update user info if info is valid
    const handleUpdate = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            const token = localStorage.getItem('token');
            axios
                .put(`https://documentary-central.herokuapp.com/users/${user}`, {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                .then((response) => {
                    alert('The profile has been updated successfully.');
                    localStorage.setItem('user', response.data.Username),
                        console.log(response.data);
                    window.open('/', '_self');
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    //Show favorite documentaries

    const showFavorites = () => {
        if (documentaries.length > 0) {
            return (
                <Row className="justify-content-md-center">
                    {favoriteDocumentaries.length === 0 ? (
                        <h5 className="add-favorite-message">Add your favorite documentaries to see them here</h5>
                    ) : (
                            favoriteDocumentaries.map((documentaryId, i) => (
                                <Col xs={12} md={6} lg={3} key={`${i}-${documentaryId}`}>
                                    <DocumentaryCard documentary={documentaries.find((documentary) => documentary._id == documentaryId)} />
                                    <Button variant="primary" className="remove-button" onClick={() => removeFav(documentaryId)}>Remove 💙</Button>
                                </Col>
                            ))
                        )}
                </Row>
            );
        }
    };




    //Remove docu from favorites
    const removeFav = (documentaryId) => {
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







    //Allow user to deregister
    const handleDelete = () => {

        axios.delete(`https://documentary-central.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response.data);
                alert('Your profile has been deleted');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(error => {
                console.log(error)
            });
    }


    return (
        <Container className="profile-view">


            <Fragment>
                <Card text='dark' className="user-form">
                    <Card.Header className="header-title">Current profile information:</Card.Header>
                    <Card.Body className="current-profile">
                        <Card.Subtitle>Username: </Card.Subtitle>
                        <Card.Text className="sub-title"> {username}</Card.Text>
                        <Card.Subtitle>Email: </Card.Subtitle>
                        <Card.Text className="sub-title"> {email}</Card.Text>
                        <Card.Subtitle>Birthday: </Card.Subtitle>
                        <Card.Text className="sub-title"> {moment(birthday).format('DD/MM/YYYY')}</Card.Text>
                    </Card.Body>
                </Card>
                <br>
                </br>
                <br>
                </br>
                <Form fluid className="profile-form">
                    <h4 className="header-title"> Edit profile information: </h4>
                    <br>
                    </br>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="form-label-style">Username</Form.Label>
                        <Form.Control className="profile-input"
                            type="text"
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        {usernameErr && <p>{usernameErr}</p>}

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="form-label-style">Email</Form.Label>
                        <Form.Control className="profile-input"
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {emailErr && <p>{emailErr}</p>}
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="birthday">
                        <Form.Label className="form-label-style">Birthday</Form.Label>
                        <Form.Control className="profile-input"
                            type="text"
                            placeholder="Enter birth date - DD/MM/YYYY"
                            onChange={(e) => setBirthday(e.target.value)}
                            value={moment(birthday).format('DD/MM/YYYY')}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="form-label-style">Password</Form.Label>
                        <Form.Control className="profile-input"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                    <br>
                    </br>
                    <Button variant="primary" className="update-button" type="submit" onClick={handleUpdate}>Update account</Button>
                    <Button variant="primary" className="delete-button" onClick={handleDelete}>Delete account</Button>
                </Form>

                <br>
                </br>
                <br>
                </br>

                <Container fluid className="favorite-container">
                    <h4 className="favorite-title"> Your top picks: </h4>
                    <br>
                    </br>
                    {showFavorites()}
                </Container>

            </Fragment >
        </Container >
    )
}

/*
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { removeFav })(ProfileView);
*/