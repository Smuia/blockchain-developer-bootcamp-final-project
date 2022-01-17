// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Define Fundraise contract
contract FundRaise {

    uint public eventId = 0;

    //define fundRaiseEvent Struct
    struct FundRaiseEvent {
        string title;
        string description;
        uint goal;
        uint current;
        uint id;
        bool status;
        address creator;
    }

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
    function createEvent(string memory title, string memory description, uint goal) public {
        uint idForNewEvent = eventId;
        address eventCreator = msg.sender;
        FundRaiseEvent memory newFundRaise = FundRaiseEvent(title, description, goal, 0, idForNewEvent, true, eventCreator);

        fundRaises[idForNewEvent] = newFundRaise;

        eventId += 1;

        emit EventCreated(idForNewEvent);
    }
    

    //Create a donate function
    function donate(uint idForEvent) public payable {
        FundRaiseEvent storage fundRaise = fundRaises[idForEvent];
        uint amount = msg.value;

        fundRaise.current = fundRaise.current + amount;
    }

    //Get the current balance & Transfer balance to user
    function withdraw(uint idForEvent) public {

        address payable accountWithdrawing = payable(msg.sender);


        FundRaiseEvent storage fundRaise = fundRaises[idForEvent];
        //Verify if person withdrawing is owner
        require(accountWithdrawing == fundRaise.creator);
        //If yes, transfer the amounts
        accountWithdrawing.transfer(fundRaise.current);

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