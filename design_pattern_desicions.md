## Design Patterns used

- I have used `Ownable` design pattern in `createEvent()` and `withdraw()` functions. These functions cannot be used by anyone else apart from contract creator(Person responsible for managin the campaign operations)

# Inheritance and Interfaces
- As a rule, my design pattern for solidity revolves around inheriting contracts, in order to prevent unnecessary errors in the contract.
- `Fundraise` contracts inherits the OpenZeppelin `Ownable` contract to enable ownership of the managing user.
