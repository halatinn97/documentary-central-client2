import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { DocumentaryCard } from '../documentary-card/documentary-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function DocumentariesList(props) {
    const { documentaries, visibilityFilter } = props;
    let filteredDocumentaries = documentaries;

    if (visibilityFilter !== '') {
        filteredDocumentaries = documentaries.filter(documentary => documentary.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!documentaries) return <div className="main-view" />;

    return <>
        {/*<Col md={12} style={{ margin: '1em' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>*/}
        {filteredDocumentaries.map(documentary => (
            <Col md={3} key={documentary._id}>
                <DocumentaryCard documentary={documentary} />
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(DocumentariesList);