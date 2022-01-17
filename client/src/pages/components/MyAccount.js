import React, {useState, useEffect} from 'react';
import {Container,Row, Col, Table} from 'react-bootstrap';
import './css/MyAccount.css';
import {PersonBoundingBox} from 'react-bootstrap-icons';
import Web3 from 'web3';
import FundRaise from '../../contracts/FundRaise.json';




export default  function MyAccountComponent(){

    const [dependencies, setDependencies] = useState({ web3: null, account: null, fundRaise: null, loaded: false });

    /**
     * @description Use effect to load the dependencies needed by the routes to interact with the blockchain
     */
    useEffect(() => {
      (async function() {
        const web3 = await Web3();
  
        const networkId = await web3.eth.net.getId();
        const networkData = FundRaise.networks[networkId];
        const fundRaise = new web3.eth.Contract(FundRaise.abi, networkData.address);
  
        const [account] = await web3.eth.accounts[0];
  
        setDependencies(previousState => ({ ...previousState, web3, account, fundRaise, loaded: true }));
      })();
    }, []);
  
    return(
        
        <Container className="Profile-wrapper">
            
            <Row>
                <Col><h1><PersonBoundingBox/>  Account Details</h1></Col>
            </Row>
            <Row><Col>Account Status: <strong>Logged In</strong></Col></Row>

            <div className="profileDetails">
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Account Address</th>
                        <td>{dependencies.account}</td>
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

