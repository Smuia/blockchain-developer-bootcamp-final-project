import { Web3Provider } from '@ethersproject/providers';
import * as React from 'react';
import web3 from 'web3';

export default React.createContext({
    fundRaise:() => {},
    web3: Web3Provider,
    account: web3.eth.getAccounts()
});
