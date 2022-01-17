# Contract Security measures

## SWC-103 (Floating pragma)

I specified pragma `0.8.0` in my contracts to avoid accidental bug due to outdated compiler versions

## SWC-105 (Unprotected Ether Withdrawal)
`withdraw` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.


