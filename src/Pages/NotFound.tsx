import React from 'react';
import { Container } from 'react-bootstrap';

function NotFound() {

    return (
        <Container className="p-2" id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>ERROR</i>
            </p>
        </Container>
    )
}

export default NotFound;
