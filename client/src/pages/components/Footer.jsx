import React from 'react';
import { Container } from 'react-bootstrap';
import './css/Footer.css';

export default function FooterComponent(){

    const date = new Date();
    const Year = date.getFullYear();
        
    return(
        
        //create footer here
        <Container>
            <footer className="Footer">
                <small style={{marginTop:"1rem"}}> © {Year} Copyright by <a href="https://github.com/Smuia/blockchain-developer-bootcamp-final-project.git" >Simon Muia</a></small>
            </footer>
        </Container>
    )
}