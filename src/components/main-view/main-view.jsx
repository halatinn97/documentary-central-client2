import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { DocumentaryView } from '../documentary-view/documentary-view';
import { GenreView } from '../genre-view/genre-view';
import { PersonalityView } from '../personality-view/personality-view';
import { ProfileView } from '../profile-view/profile-view';
import { Menubar } from '../navbar/navbar';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setDocumentaries } from '../../actions/actions';
import DocumentariesList from '../documentaries-list/documentaries-list';
import './main-view.scss';



class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getDocumentaries(accessToken);
        }
    }
    setSelectedDocumentary(newSelectedDocumentary) {
        this.setState({
            selectedDocumentary: newSelectedDocumentary
        });
    }

    /*
    onRegistered(registered) {
        this.setState({
            registered
        });
    }
    */

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getDocumentaries(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    getDocumentaries(token) {
        axios.get('https://documentary-central.herokuapp.com/documentaries', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setDocumentaries(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let { documentaries } = this.props;
        let { user } = this.state;

        return (
            <Router>
                <Menubar user={user} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (documentaries.length === 0) return <div className="main-view" />;
                        return <DocumentariesList documentaries={documentaries} />
                    }} />
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return (<Col>
                            <RegistrationView />
                        </Col>)
                    }} />
                    <Route path="/documentaries/:DocumentaryID" render={({ match, history }) => {
                        if (documentaries.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DocumentaryView documentary={documentaries.find(documentary => documentary._id === match.params.DocumentaryID)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genres/:Name" render={({ match, history }) => {
                        if (documentaries.length === 0) return <div className="main-view" />;

                        return <Col md={8}>
                            <GenreView genre={documentaries.find(documentary => documentary.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route exact path="/featuredPersonalities/:Name" render={({ match, history }) => {
                        if (documentaries.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <PersonalityView featuredPersonality={documentaries.find(documentary => documentary.FeaturedPersonality.Name === match.params.Name).FeaturedPersonality} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path={`/users/${user}`} render={({ history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (documentaries.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <ProfileView documentaries={documentaries} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                </Row>
            </Router>

        );
    }
}

let mapStateToProps = state => {
    return {
        documentaries: state.documentaries,
        user: state.user
    }
}

export default connect(mapStateToProps, { setDocumentaries })(MainView);