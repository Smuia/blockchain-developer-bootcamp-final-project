// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Contract for automated charity fundraising projects.
/// @author Simon Muia
/// @notice Allows a user to create fundraising campaigns.
/// @dev Timestamps in secs to match block.timestamp unit 

//Define Fundraise contract
contract FundRaise is Ownable {

    uint256 public eventId = 0;

    //define fundRaiseEvent Struct
    struct FundRaiseEvent {
        string title; //Project title
        string description; // Project description
        uint goal; // Amount the beneficiary wishes to raise
        uint currentAmount; //current fundraised amount
        uint id; //Project id
        bool status;
        address creator; //If the project owner who is allowed to withdraw.
    }
    //Load the project title and description.
    struct HomeCard {
        string title;
        uint id;
    }

    
    mapping (uint => FundRaiseEvent) public fundRaises;

    //Emit an event to let the user know the event has been created.
    event EventCreated(uint id);
    //Emit donated event
    event Donated(uint amount);
    //Emit Withdraw event
    event Withdraw(uint id);

    //implement create fundraising event (capture, event title, description and goal)
    function createEvent(
        string memory _title, 
        string memory _description, 
        uint goal
        ) public onlyOwner {

        uint idForNewEvent = eventId;
        address eventCreator = payable(msg.sender);

        FundRaiseEvent memory newFundRaise = FundRaiseEvent(

            _title, _description, goal, 0, idForNewEvent, true, eventCreator
            
            );

        fundRaises[idForNewEvent] = newFundRaise;

        eventId += 1;

        emit EventCreated(idForNewEvent);
    }
    

    //Create a donate function
    function donate(uint idForEvent) public payable {
        FundRaiseEvent storage fundRaise = fundRaises[idForEvent];
        uint amount = msg.value;

        fundRaise.currentAmount = fundRaise.currentAmount + amount;
    }

    //Get the Amount balance & Transfer balance to user
    function withdraw(uint idForEvent) public {

        address payable accountWithdrawing = payable(msg.sender);


        FundRaiseEvent storage fundRaise = fundRaises[idForEvent];
        //Verify if person withdrawing is owner
        require(accountWithdrawing == fundRaise.creator);
        //If yes, transfer the amounts
        accountWithdrawing.transfer(fundRaise.currentAmount);

        fundRaise.status = false;

        emit Withdraw(idForEvent);
    }

    //create function that gets data for HomePage
    function getHomeData() public view  returns (HomeCard[] memory) {
        HomeCard[] memory cards = new HomeCard[](eventId);

        //loop through the available fundraisers and create homeCard for each fundraiser
        for (uint i=0; i < eventId; i++) {
            HomeCard memory homeCard = HomeCard(fundRaises[i].title, i);
            cards[i] = homeCard;
        }
        return cards;
    }

}