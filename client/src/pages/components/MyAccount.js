import React from 'react';
import {Container,Row, Col, Button, Table} from 'react-bootstrap';
import './css/MyAccount.css';
import {PersonBoundingBox,DoorOpenFill} from 'react-bootstrap-icons';





export default  function MyAccountComponent(){

  
    return(
        
        <Container className="Profile-wrapper">
            <Row>
                <Col><Button variant="outline-warning"> <DoorOpenFill/> Logout</Button></Col>
            </Row>
            
            <Row>
                <Col><h1><PersonBoundingBox/>  Account Details</h1></Col>
            </Row>
            <Row><Col>Account Status: <strong>Logged In</strong></Col></Row>

            <div className="profileDetails">
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Account Address</th>
                        <td> </td>
                    </tr>
                    <tr>
                        
                            <th>Ethereum Wallet</th>
                            <td>wallet here</td>
                        
                    </tr>
                    <tr>
                        <th>Account Balance</th>
                        <td>balance here</td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </Container>

       
            
    )
}

