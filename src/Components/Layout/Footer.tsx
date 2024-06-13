import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {


    return (
        <Container fluid className="footer fixed-bottom text-center p-3 bg-dark text-white">
        &copy; Made with <i className="bi bi-heart-fill"></i> by Home
      </Container>
    )
}

export default Footer;