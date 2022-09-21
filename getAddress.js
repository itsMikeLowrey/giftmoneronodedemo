const monerojs = require("monero-javascript");
if (monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("C:") == 0 && monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("file://") == -1)
    monerojs.LibraryUtils.WORKER_DIST_PATH = "file://"+monerojs.LibraryUtils.WORKER_DIST_PATH;
main();
async function main() {
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    password: "0",
    mnemonic: 'sack people folding mice ferry etched sifting ruffled elbow orphans village stunning nurse argue atom emulate deity antics swept dizzy fiat because zeal alchemy dizzy'
  });
  const address = await walletFull.getAddress(0, 0) // never change account numbers
  console.log(address)
  async function myFunctionThatCatches() {
    try {
        return await walletFull.close(true)
    } catch (e) {

    } finally {
    }
    return "Nothing found";
}
  await myFunctionThatCatches()
  process.exit();
}
