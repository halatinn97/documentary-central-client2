import React from 'react';


export class DocumentaryCard extends React.Component {
    render() {

        const { documentary, onDocumentaryClick } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={documentary.ImagePath} />
                <Card.Body>
                    <Card.Title>{documentary.Title}</Card.Title>
                    <Card.Text>{documentary.Description}</Card.Text>
                    <Button onClick={() => onDocumentaryClick(documentary)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}    