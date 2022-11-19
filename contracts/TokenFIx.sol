// SPDX-License-Identifier: UNLICENSED
// contracts/TokenExchange.sol
pragma solidity 0.8.10;

// Import base Initializable contract

// Import the IERC20 interface and and SafeMath library
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import {SafeERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract TokenFix {
    using SafeMath for uint256;

    using SafeERC20 for IERC20;

    // Contract state: exchange rate and token
    IERC20 public oldToken;

    IERC20 public newToken;

    uint private userBalance;
    
    uint private allowance;

    event userBalanceEmission(uint balance);
    event swapAmountEmission(uint swapAmount);
    event transferData(address destinationAddress);
    event oldAddress(IERC20 oldTokenAddress);
    event userAddress(address userAddress);

    constructor(address _oldToken, address _newToken) {
        oldToken = IERC20(_oldToken);
        newToken = IERC20(_newToken);
    }

    //@notice this function is to swap old tokens for new tokens at a 1:1 rate (?) 
    function swap(uint256 swapAmount) public {
        userBalance = IERC20(oldToken).balanceOf(msg.sender);

        if (userBalance < swapAmount) {
            revert('Swap amount exceeds balance');
        }

        emit userBalanceEmission(userBalance);
        emit swapAmountEmission(swapAmount);
        emit transferData(address(this));
        emit oldAddress(oldToken);
        emit userAddress(msg.sender);

        IERC20(oldToken).transferFrom(msg.sender, address(this), swapAmount);

        // IERC20(newToken).safeTransfer(msg.sender, swapAmount);
    }

    function swapDataDump(uint256 swapAmount) public {
        userBalance = IERC20(oldToken).balanceOf(msg.sender);

        if (userBalance < swapAmount) {
            revert('Swap amount exceeds balance');
        }

        emit userBalanceEmission(userBalance);
        emit swapAmountEmission(swapAmount);
        emit transferData(address(this));
        emit oldAddress(oldToken);
        emit userAddress(msg.sender);

        // IERC20(oldToken).safeTransfer(address(this), swapAmount);

        // IERC20(newToken).safeTransfer(msg.sender, swapAmount);
    }

    //@notice this function is to swap old tokens for new tokens at a 1:1 rate (?) 
    function userBalances(uint256 swapAmount) public {
        userBalance = IERC20(oldToken).balanceOf(msg.sender);

        emit userBalanceEmission(userBalance);
        emit swapAmountEmission(swapAmount);

        if (userBalance < swapAmount) {
            revert('Swap amount exceeds balance');
        }
    }

    function approve(address tokenAddress) public {
        // https://ethereum.stackexchange.com/questions/94520/explicit-type-conversion-not-allowed-from-int-const-1-to-uint128
        allowance = 100000000000000000000000;
        IERC20(tokenAddress).approve(address(this), allowance);
        IERC20(tokenAddress).approve(msg.sender, allowance);
    }
}