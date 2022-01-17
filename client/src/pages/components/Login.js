import React, { useEffect, useState } from "react";
  import './css/Login.css';


function isMobileDevice() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected) {
  if (!window.ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected) {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length > 0) {
      const account = accounts[0];
      onConnected(account);
      return;
    }

    if (isMobileDevice()) {
      await connect(onConnected);
    }
  }
}


export default function MetaMaskAuth({ onAddressChanged }) {

  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    checkIfWalletIsConnected(setUserAddress);
  }, []);

  /*useEffect(() => {
    onAddressChanged(userAddress);
  }, [userAddress]);*/

 
  return userAddress ? (
   window.location.reload()
  ) : (
     <Connect setUserAddress={setUserAddress}/>
  );
}


function Connect({ setUserAddress }) {
  if (isMobileDevice()) {
    const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/127.0.0.1:3000" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
         <button className="LoginBtn">
           Connect to MetaMask
         </button>
      </a>
    );
  }

  
  return (
    <button className="LoginBtn" onClick={() => connect(setUserAddress)}>
      Connect to MetaMask
    </button>
  );
}


/*function Address({ userAddress }) {
  return (
    <span className="address">{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)}</span>
  );
}*/
