// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./MyToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Payment is Ownable {
    MyToken public token;
    event Transfer(string indexed email);

    constructor(MyToken _token, address intialAddress) Ownable(intialAddress) {
        token = _token;
    }

    function moveFunds(
        address sender,
        uint amount,
        string memory email
    ) public returns (bool) {
        address receiver = owner();
        token.transferFrom(sender, receiver, amount);
        emit Transfer(email);
        return true;
    }
}
