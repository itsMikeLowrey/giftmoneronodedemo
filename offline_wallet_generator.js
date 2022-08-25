const monerojs = require("monero-javascript");

main();
async function main() {

  // create a random keys-only (offline) stagenet wallet
  let walletKeys = await monerojs.createWalletKeys({networkType: "testnet", language: "English"});

  // print wallet attributes
  console.log("Mnemonic phrase: " + await walletKeys.getMnemonic());
  console.log("Address: " + await walletKeys.getAddress(0,0)); // get address of account 0, subaddress 0
  console.log("Spend key: " + await walletKeys.getPrivateSpendKey());
  console.log("View key: " + await walletKeys.getPrivateViewKey());
}
