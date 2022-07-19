import React, { useEffect, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import './profile-view.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { FavoriteDocumentaries } from '../favorite-view/favorite-view';


export function ProfileView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [favoriteDocumentary, setfavoriteDocumentary] = useState(['']);

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
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios
            .get(`https://documentary-central.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setUsername(response.data.Username);
                setUser(response.data)
                setEmail(response.data.Email);
                setBirthday(response.data.Birthday);
                setfavoriteDocumentary(response.data.favoriteDocumentary);
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

    /*Add docu to favorites....

    //Remove docu from favorites
    const removeFav = () => {
        axios.delete(`https://documentary-central.herokuapp.com/users/${user}/documentaries/${documentary._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert('The documentary has been deleted from your favorites list.')
                window.open('/', '_self');
            })
            .catch(error => {
                console.log(error)
            });
    }
    */



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

        <Fragment>
            <h4 className="white-text"> Current profile information: </h4>
            <Card text='dark' className="user-form">
                <Card.Body>
                    <Card.Text>Username: {username}</Card.Text>
                    <Card.Text>Email: {email}</Card.Text>
                    <Card.Text>Birthday: {birthday}</Card.Text>
                    <Card.Text>Password: {password}</Card.Text>

                </Card.Body>
            </Card>

            <br>
            </br>

            <h4 className="white-text"> Edit profile information: </h4>
            <Form className="profile-form">
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    {usernameErr && <p>{usernameErr}</p>}

                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
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
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter birth date"
                        onChange={(e) => setBirthday(e.target.value)}
                        value={birthday}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Button variant="primary" className="update-button" type="submit" onClick={handleUpdate}>Update</Button>
                <Button variant="primary" className="delete-button" type="submit" onClick={handleDelete}>Delete account</Button>
            </Form>

            <br>
            </br>

            <h4 className="white-text"> Favorite documentaries: </h4>

        </Fragment>
    )
}