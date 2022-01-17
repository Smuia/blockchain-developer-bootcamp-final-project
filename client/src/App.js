import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {Row, Col, Container} from 'react-bootstrap';
import { HomeWrapper as Home } from './pages/home/Home';
import { FundRaiseWrapper } from './pages/fund-raise/FundRaise';
import AppContext from './app-context'
import FundRaise from './contracts/FundRaise.json';
import getWeb3 from './getWeb3';
import NavBarComponent from './pages/components/NavBar';
import './index.css';
import LoginPageComponent from './pages/components/Login';
import MyAccountComponent from './pages/components/MyAccount';
import FooterComponent from './pages/components/Footer';


export default function App() {
  if(window.ethereum) {
    window.ethereum.on('networkChanged', () => window.location.reload());
  }

  const [dependencies, setDependencies] = useState({ web3: null, account: null, fundRaise: null, loaded: false });

  /**
   * @description Use effect to load the dependencies needed by the routes to interact with the blockchain
   */
   useEffect(() => {
    (async function(networkId, networkData, fundRaise, web3) {
      web3 = await getWeb3();
      networkId = await web3.eth.net.getId();
      networkData = FundRaise.networks[networkId];
      fundRaise = new web3.eth.Contract(FundRaise.abi, networkData.address);

      const [account] = await web3.eth.getAccounts();

      setDependencies(previousState => ({ ...previousState, web3, account, fundRaise, loaded: true }));
    })();
  }, []);


  /**
   * @description Abstraction for connecting user to application;
   * this is shown to the user if they are not initially connected
   * on load
   */
  
  return (
    <Router>
      <AppContext.Provider value={{ dependencies }}>
        {
          dependencies.loaded ?
          (
            dependencies.account ?
              <Switch>
                <Route path="/fund-raise/:id">
                  <NavBarComponent/>
                  <FundRaiseWrapper/>
                  <FooterComponent/>
                </Route>
                <Route exact path="/account">
                  <NavBarComponent/>
                  <MyAccountComponent/>
                  <FooterComponent/>
                </Route>
                <Route path="/">
                <NavBarComponent/>
                  <Home/>
                  <FooterComponent/>
                </Route>                
                <Route path="*">
                  <NoMatch/>
                </Route>
              </Switch> :
              <div className="loginPortal">
                <Container>
                  <Row>
                  <Col><h1>FUND-NET</h1></Col>
                  </Row>
                  <Row className="loginDescription">
                  <Col><small>Welcome to fund-net portal. Connect to Metamark via the button below to access the portal</small></Col>
                </Row>
                <Row>
                  <Col><LoginPageComponent/></Col>
                </Row>
                
                </Container>
                
              </div>
              
              
          ) : 
          <div>loading....</div>
        }
      </AppContext.Provider>
    </Router>
  );
}

function NoMatch() {
  return (
    <div>Page not found (404).</div>
  )
}