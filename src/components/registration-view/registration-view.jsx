import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios'

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://documentary-central.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })

            .catch(error => {
                console.log(error);
                alert('Something was not entered right.')
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register now to view unlimited documentaries, anywhere, anytime.</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username:  </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Enter a username"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password:  </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                            minLength="8"
                                            placeholder="Enter a password"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="Enter an email"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={birthday}
                                            onChange={e => setBirthday(e.target.value)}
                                            placeholder="Enter a birthday"
                                        />
                                    </Form.Group>

                                </Form>
                                <Button variant="primary" type="submit"
                                    onClick={handleSubmit}>Submit</Button>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func.isRequired,
};