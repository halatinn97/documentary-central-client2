import React from 'react';
import { Navbar, NavDropdown, Container, Form, Button, Nav } from 'react-bootstrap'
import './navbar.scss';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import brandLogo from '../../../img/brand-logo.png';


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
        <Navbar collapseOnSelect expand="lg" className="navbar-style d-flex" bg="lightslategray" expand="lg">
            <Container className="navbar-container">
                <Container className="logo">
                    <Navbar.Brand className="page-title">DOCUMENTARY CENTRAL
                        <a href="/">
                            <img src={brandLogo} className="brand-logo" width="50" height="50" alt="" />
                        </a>
                    </Navbar.Brand>
                </Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="navbar-content">
                    <Nav
                        className="me-auto"
                    >
                        {isAuth() && (
                            <Button className="nav-links" variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {isAuth() && (
                            <Nav.Link className="nav-links" href={`/users/${user}`}>Profile</Nav.Link>
                        )}
                        {isAuth() && (
                            <Nav.Link className="nav-links" href="/">Home</Nav.Link>
                        )}
                        {isAuth() && (
                            <NavDropdown className="nav-links" title="Documentaries" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/">Documentaries</NavDropdown.Item>
                                <NavDropdown.Item href="featuredPersonalities/">Personalities</NavDropdown.Item>
                                <NavDropdown.Item href="genre/">Genre</NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <VisibilityFilterInput />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}