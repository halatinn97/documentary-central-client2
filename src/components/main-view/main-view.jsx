import React from 'react';
import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { DocumentaryCard } from '../documentary-card/documentary-card';
import { DocumentaryView } from '../documentary-view/documentary-view';


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            documentaries: [],
            selectedDocumentary: null,
            user: null,
            registered: null
        };
    }

    componentDidMount() {
        axios.get('https://documentary-central.herokuapp.com/documentaries')
            .then(response => {
                this.setState({
                    documentaries: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedDocumentary(newSelectedDocumentary) {
        this.setState({
            selectedDocumentary: newSelectedDocumentary
        });
    }

    onRegistered(registered) {
        this.setState({
            registered
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { documentaries, selectedDocumentary, user, registered } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (!registered) return <RegistrationView onRegistered={register => this.onRegistered(register)} />;

        // Before the movies have been loaded
        if (documentaries.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedDocumentary
                    ? <DocumentaryView documentary={selectedDocumentary} onBackClick={newSelectedDocumentary => { this.setSelectedDocumentary(newSelectedDocumentary); }} />
                    : documentaries.map(documentary => (
                        <DocumentaryCard key={documentary._id} documentary={documentary} onDocumentaryClick={(newSelectedDocumentary) => { this.setSelectedDocumentary(newSelectedDocumentary) }} />
                    ))
                }
            </div>
        );
    }

}
