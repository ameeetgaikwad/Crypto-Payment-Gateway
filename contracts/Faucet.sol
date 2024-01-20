// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./MyToken.sol";

contract Faucet {
    MyToken public token;

    constructor(MyToken _token) {
        token = _token;
    }

    function claimTokens() public {
        token.transfer(msg.sender, 10 * 10 ** 18);
    }
}
