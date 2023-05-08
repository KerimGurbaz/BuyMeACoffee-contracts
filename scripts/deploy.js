const hre = require("hardhat");
async function main (){

}
// we recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
});