// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");

// Retuns the Ethers balance of a given address.
async function getBalance(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
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

async function main(){
  // Get example accouns.
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  // Get the contract to deploy & deploy.

  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();
  console.log("Buy me coffee deploed to : " , buyMeACoffee.address);

  // Check balances before the coffee purchase.

  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("==  start  ==");
  await printBlances(addresses);

  //Buy the owner a few coffees.
  const tip = {value: hre.ethers.utils.parseEther("1")};
  await buyMeACoffee.connect(tipper).buyCoffee("Carolina", "You're the best",tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Amazing Teacher :)",tip);
  await buyMeACoffee.connect(tipper).buyCoffee("Kay", "I love my proof of Knowledge NFT",tip);

  // Check balances after coffee purchase.
  console.log(" == bought coffee == ");
  await printBlances(addresses)

}

main()
.then(()=> process.exit(0))
.catch((error)=>{
  console.error(error);
  process.exit(1);
});