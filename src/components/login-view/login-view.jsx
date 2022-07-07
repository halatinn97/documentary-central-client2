import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login-view.scss';



export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('https://documentary-central.herokuapp.com/login', {
                Username: username,
                Password: password,
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(error => {
                console.log(error);
                alert('User does not exist.')

            });
    };



    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
      </Button>
        </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};