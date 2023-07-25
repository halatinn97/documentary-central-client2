import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import './login-view.scss';
import { Link } from 'react-router-dom';
import { setUser, validateInput } from '../../actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }

        return isReq;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios
                .post('https://documentary-central-production.up.railway.app/login', {
                    Username: username,
                    Password: password,
                })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };


    return (
        <Form id="login-form" className="d-flex justify-content-center align-items-center flex-column">
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control className="login-input" type="text" onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control className="login-input" type="password" onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <div className="button-container">
                <Button variant="primary" type="submit" onClick={handleLogin} className="login-button">Login</Button>
                <Link to="/register">
                    <Button variant="button" className="register-button">Register</Button>
                </Link>
            </div>
        </Form >
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { setUser, validateInput })(LoginView);