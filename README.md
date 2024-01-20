# Crypto-Payment-Gateway

## Overview
- You can buy Harkirat's course using the given testnet tokens. The course price is 2 tokens.

## Verification logic
- The application asks user to `approve` 2 tokens. The user gives a contract `Payment.sol` permission to transfer 2 tokens.
- Then `moveFunds` function in `Payment.sol` is called by the user. Here the 2 tokens are <u>transfered</u> by the `Payment.sol` contract to a EOA, which is owned by me.

## Where to get testnet tokens?
- Faucet is provided, <a href="https://cryptopay-eta.vercel.app/faucet" target="blank">faucet</a>.

## Contract and EOA addresses
- EOA: `0x93104E260cb74E94038F4325098d31EE426C6F85`
- MyToken.sol: `0xA27612ea3e47750DD1Ff27223cfBAEE99BC9a401`
- Payment.sol: `0x21A14df46428681954AcEB96C7F39BD26D283d75`
- Faucet.sol: `0xb910de2349eb28985f2140ff286f70046beba916`

## Future improvements
- I can use The Graph to index events and make the the `moveFunds` function emit event with email address of the user. And handle all the login in the backend rather than in frontend.
