import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './registration-view.scss';



export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    console.log('hello')


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

    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {

            axios.post('https://documentary-central-production.up.railway.app/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data)
                    alert('Registered successfully. Please log in to access website.')
                    window.open('/', '_self');
                })

                .catch(error => {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert('Something was not entered right.')
                });
        };
    }

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register now to view unlimited documentaries, anywhere, anytime.</Card.Title>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:  </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Enter a username"
                                        />
                                        {usernameErr && <p>{usernameErr}</p>}

                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:  </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            minLength="8"
                                            placeholder="Enter a password"
                                        />
                                        {passwordErr && <p>{passwordErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter an email"
                                        />
                                        {emailErr && <p>{emailErr}</p>}

                                    </Form.Group>

                                    <Form.Group controlId="formBirthday">
                                        <Form.Label>Birthday: </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            placeholder="Enter a birthday"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit"
                                        onClick={handleRegister}>Submit</Button>
                                    <p></p>
                                    <p>Already registered? <Link to={'/'}>Sign in here</Link></p>
                                </Form>

                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}


/*
RegistrationView.propTypes = {
    Onregister: propTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};
*/