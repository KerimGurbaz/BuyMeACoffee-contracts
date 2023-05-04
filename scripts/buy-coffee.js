// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Retuns the Ethers balance of a given address.
async function getBalance(address){
  const balanceBigInt = await hre.waffle.provider.getBalance(address);

  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of addresses

async function printBlances(addresses){
  let idx = 0;
  for(const address of addresses){
    console.log(`Address ${idx} balance : `, await getBalance(address));
    idx++
  }
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}, ${tipper}, (${tipperAddress}) said: "${message}"`);
    }
}