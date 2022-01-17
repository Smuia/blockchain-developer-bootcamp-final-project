<h1> FUND-NET-CHARITY-DAPP</h1>


## BRIEF DESCRIPTION

* Fund-net is a simple Genuine Charity fundraising Dapp focused on funding Community projects. Unlike normal daily fundraising systems. Fund-net uses smart contracts to manage the fund processing and storage of the transaction logs on blockchain.

* The project is available on Github via https://github.com/Smuia/blockchain-developer-bootcamp-final-project.git


## LINKS
1. Deployed App: https://fund-net-dapp.herokuapp.com/ [in progress]
2. Screencast: [In Progress]

## Public Ethereum wallet for certification
`0x2dc989a263e1ea95d095b5f6cb68540a5441b052`

## STATUS

* The project is 99% Complete.

## Project structure

1. Root project - Contains truffle and contract files
2. `Client` folder - Contains frontend side (ran under react framework)

## Tools used.
1. React Js - (https://reactjs.org/)(Frontend)
2. Truffle - (https://trufflesuite.com/)(Backend)

<br><br>

## How to run this project locally

<strong>Prerequisites</strong>

1. Node Version - 16.13.x (Stable version)
2. Ganache Version - 2.5.4 (latest stable version)
3. Truffle Version 5.4.28 or higher
4. Web3.js v1.5.3 or higher

<hr>

1. Clone this project through `git clone {_git_url}` command

### Contracts

1. Run `npm install` in project root to install truffle build and smart contract dependencies

2. Run local testnet on port `7545` with an ethereum client like Ganache.

3. Run `truffle migrate --network development` to deploy

4. Run `truffle test --network developement` to test the contracts



* Navigate to <strong> client</strong> folder by running `cd client` command

### FrontEnd

- The front end is developed using React framework to call the contracts on root folder.

1. Run `npm install` to install the React dependencies
2. Run `npm start` to  run the project.

* Access the project local UI from `https://localhost:3000`
* Ensure Metamask localhost network is in port `7545`.

* Incase of any error on metamask, reset the account from:

    Metamask-> Advanced settings -> Reset account
* The project should now be running.

### Project Workflow

1. Enter the service website
2. Login with Metamask.
3. Create a Campaign through <b> Create Project</b> button
4. Agree on contract and pay first installment with metamask.
5. Campaign will be created and listed under <b> Explore our Campaigns </b> section
6. Select Campaign by clicking <b> Learn More </b> button
7. Donate to the project through <b> Donate</b> button
8. Confirm the transaction from metamask.
9. Your ether donation will reflect on the Raised amounts within the project.
10. Click <b> withdraw </b> button to withdraw the Project donated ether
(This demonstrates the beneficiary side of the portal functionality)
11. Confirm from MetaMask the withdrawal of ether. 


### Future upgrades
1. Beneficiary Portal with full functionality to apply, create and withdraw amounts.
2. Beneficiary Payments tracking.



## Author

* <strong> Simon Muia(https://github.com/Smuia/) </strong> - ConcenSys Student 2021 -2022


