# AREXA Platform - The Arexa AI token:

The platform provides all the functionalities of the tokens and subscriptions. Also manages the Pool and the distribution of it.
Check on [Etherscan](https://etherscan.io/address/0xeeb00e283259d5e1930f27c62552a6a6be510348) or [Louper](https://louper.dev/diamond/0xeeb00e283259d5e1930f27c62552a6a6be510348?network=mainnet)

Implemented ERC1155 with ERC2535

# AREXA ERC20 - The RXAI token

An ERC20 token for the AREXA AI Platform token. When someone withdraw the AREXA AI Token from the platform, then he/she won't eligible more income from the Pool.
Why do you wan't to withdraw? For example you would like to sell your token on a DEX or CEX. ;)
[Etherscan](https://etherscan.io/address/0x4db1e53cc2c676cfd8e8e15e1710d0182bf32838) or [Louper](https://louper.dev/diamond/0x4db1e53cc2c676cfd8e8e15e1710d0182bf32838?network=mainnet)

After withdrawing your AREXA AI token from Platform, you get an ERC20 token. With this token you can do anything like other token, DEC, CEX, bridge to other chains etc...

Implemented ERC20 with ERC2535

# Links

**Website:**: [https://arexa.io](https://arexa.io)
**Whitepaper:** [https://arexa.io/whitepaper.pdf](https://arexa.io/whitepaper.pdf)
**Youtube:** [https://www.youtube.com/@ArexaAI](https://www.youtube.com/@ArexaAI)
**Telegram:** [https://t.me/arexa_ai/1](https://t.me/arexa_ai/1)
**OpenSea:** [https://opensea.io/collection/arexa-ai](https://opensea.io/collection/arexa-ai)
**GitHub:** [https://github.com/arexa-ai](https://github.com/arexa-ai)

# CLI commands

```shell
npx hardhat compile
npx hardhat coverage
npx hardhat node --no-compile
npx hardhat deploy --network localhost

npx hardhat deploy --network sepolia

npx hardhat verify-arexa-platform --network sepolia
npx hardhat verfiy-arexa-erc20 --network sepolia
npx hardhat verify-arexa-test-usdt --network sepolia
```

## To test on localhost

For testing purposes on localhost and on test network a copy of USDT smart contract is deployed. So you can give to yourself a lot of test money to test the contracts.

```shell
npx hardhat usdt --network localhost mint --signer 2 --address 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC --value 100
npx hardhat usdt --network localhost approve --signer 2 --address 0x4A679253410272dd5232B3Ff7cF5dbB88f295319 --value 10
npx hardhat usdt --network localhost balance --signer 2 --address 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC

npx hardhat arexa-token --network localhost 4-arexa:buy --signer 2 --value 10

npx hardhat arexa-token --network localhost 4-arexa:balance --address 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
npx hardhat usdt --network localhost balance --address 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
```
