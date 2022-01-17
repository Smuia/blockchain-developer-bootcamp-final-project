For security measures, I replaced assert with require in order to prevent the Assert Violation in SWC-110. Additionally, I utilise the official Openzeppelin libraries which limits exposure to bugs.
https://swcregistry.io/docs/SWC-110

In my smart contract, I addressed the outdated compiler version by using the latest compiler compatible with the ERC-721 openzeppelin contract, mirroring the simple-nft-example contract version from scaffold-eth.
https://swcregistry.io/docs/SWC-102

