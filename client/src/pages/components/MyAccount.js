import React, {useEffect, useState} from 'react';
import {Container,Row, Col, Button, Table} from 'react-bootstrap';
import './css/MyAccount.css';
import {PersonBoundingBox,DoorOpenFill} from 'react-bootstrap-icons';






  

  
export default function MyAccountComponent(){

    const[walletAccount, setWalletAccount ] = useState('');
    const[isConnected, setIsConnected ]= useState(false);
    const [ ethBalance, setEthBalance ] = useState(null);
    const [ currentChain, setCurrentChain ] = useState('');
    const[currentProvider, setProviderName] = useState('');
    


  // Initialize the application and MetaMask Event Handlers
  useEffect(() => {

    // Setup Listen Handlers on MetaMask change events
    if(typeof window.ethereum !== 'undefined') {
        // Add Listener when accounts switch
        window.ethereum.on('accountsChanged', (accounts) => {

          console.log('Account changed: ', accounts[0])
          setWalletAccount(accounts[0])

        })
        
        // Do something here when Chain changes
        window.ethereum.on('chainChanged', (chaindId) => {

          console.log('Chain ID changed: ', chaindId)
          setCurrentChain(chaindId)

        })

    } else {

        alert('Please install MetaMask to use this service!')

    }
  }, [])


  // Used to see if the wallet is currently connected to the application
  // If an account has been accessed with MetaMask, then the wallet is connected to the application.
  useEffect(() => {
    setIsConnected(walletAccount ? true : false)
}, [walletAccount])

// Connect the Wallet to the current selected account in MetaMask. 
// Will generate a login request for user if no account is currently connected to the application
const handleConnectWallet = async () => {
        const provider = window.ethereum;
        const accounts = await provider.request({method: 'eth_requestAccounts' })
        const account = accounts[0];
        setWalletAccount(account);
    }


//Get network provider name
const getProviderName = async (ProviderName) => {
    const provider = window.ethereum;
    if(provider == window.ethereum){
        ProviderName = "Metamask"
        setProviderName(ProviderName);
    }else{
        ProviderName = "Multiple wallets detected."
        setProviderName(ProviderName);

    }
}

//Get current chain Id

const getCurrentChainId = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    setCurrentChain(chainId);
}
    
   // Handle Disconnected. Removing the state of the account connected 
  // to your app should be enough to handle Disconnect with your application.
  
  // Handle Disconnected. Removing the state of the account connected 
  // to your app should be enough to handle Disconnect with your application.
  const handleDisconnect = async () => {

    console.log('Disconnecting MetaMask...')
    setIsConnected(false)
    setWalletAccount('')
}

    //get account balance of current user
    const handleGetBalance = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest']})

        const wei = parseInt(balance, 16)
        const gwei = (wei / Math.pow(10, 9)) // parse to gwei
        const eth = (wei / Math.pow(10, 18)) // parse to Eth

        setEthBalance({wei, gwei, eth})
    }
    
    return(
        
        
        <Container className="Profile-wrapper">
            <Row>
                <Col><Button variant="outline-primary" size="lg"  onClick={() => {handleGetBalance(); handleConnectWallet();getCurrentChainId(); getProviderName();}}> <DoorOpenFill/> Show Account Details</Button></Col>
            </Row>
            
            <Row>
                <Col><h1><PersonBoundingBox/>  Account Details</h1></Col>
            </Row>
            <Row>
            <Col>Account Status: <strong style={{color:'green'}}>Logged In</strong></Col>
            
            </Row> 

            <div className="profileDetails">
            <Table striped bordered hover>
                <tbody>
                <tr>
                        
                        <th>Current Network Provider</th>
                        <td>{currentProvider}</td>
                    
                </tr>
                    <tr>
                        <th>Account Address</th>
                        <td>{walletAccount}</td>
                    </tr>
                    <tr>
                        
                            <th>Chain ID</th>
                            <td>{currentChain}</td>
                        
                    </tr>
                    <tr>
                        <th>Account Balance (ETH)</th>
                        <td>{ ethBalance?.eth % 1 != 0 ? ethBalance?.eth.toFixed(4) : ethBalance?.eth} </td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </Container>

       
            
    )
}

