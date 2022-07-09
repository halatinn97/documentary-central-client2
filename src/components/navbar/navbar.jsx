import React from 'react';
import { Navbar, Container, Form, Button, Nav, Container } from 'react-bootstrap'



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
            <Container fluid>
                <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {isAuth() && (
                            <Nav.Link href="{`/users/$(user)}>{user}`"></Nav.Link>
                        )}
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Profile</Nav.Link>
                        {!isAuth() && (
                            <Nav.Link href="{/register}">Sign-up</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Button variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}

                        <NavDropdown title="Documentaries" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="{/documentaries}">Documentaries</NavDropdown.Item>
                            <NavDropdown.Item href="#{documentaries/featuredPersonalities}">Personalities</NavDropdown.Item>
                            <NavDropdown.Item href="{/genre}">Genre</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}