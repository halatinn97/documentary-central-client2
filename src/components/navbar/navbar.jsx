import React from 'react';
import { Navbar, NavDropdown, Container, Form, Button, Nav, FormControl } from 'react-bootstrap'
import './navbar.scss';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';


export function Menubar({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid className="navbar-container">
                <Navbar.Brand>Documentary-Central</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {isAuth() && (
                            <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link href="/">Home</Nav.Link>
                        )}

                        {/*!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )*/}

                        {isAuth() && (
                            <NavDropdown title="Documentaries" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/">Documentaries</NavDropdown.Item>
                                <NavDropdown.Item href="featuredPersonalities/">Personalities</NavDropdown.Item>
                                <NavDropdown.Item href="genre/">Genre</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <VisibilityFilterInput />
                    </Nav>
                    <Form className="d-flex">


                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}