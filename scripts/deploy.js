const hre = require("hardhat");
async function main (){

    // Get the contract to deploy
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log("BuyMeACoffee deployed to ", buyMeACoffee.address);


}
// we recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
});