// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10 ** 18;

    constructor(
        string memory tokenName,
        string memory tokenSymbol
    ) ERC20(tokenName, tokenSymbol) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }

    function transferFromOwner(address to, uint256 amount) public {
        // Allow the owner or the approved RewardsSystem contract to call this function
        require(
            msg.sender == owner() || isApproved(msg.sender),
            "Caller is not the owner or approved contract"
        );

        _transfer(owner(), to, amount);
    }

    // Function to approve a contract (e.g., RewardsSystem) to transfer tokens on behalf of the owner
    mapping(address => bool) private approvedContracts;

    function approveContract(address contractAddress) public onlyOwner {
        approvedContracts[contractAddress] = true;
    }

    function revokeContractApproval(address contractAddress) public onlyOwner {
        approvedContracts[contractAddress] = false;
    }

    function isApproved(address contractAddress) public view returns (bool) {
        return approvedContracts[contractAddress];
    }
}
