pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GottenToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gotten", "GTN") {
        _mint(msg.sender, initialSupply);
    }
}
