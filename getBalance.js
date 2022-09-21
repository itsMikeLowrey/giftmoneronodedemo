const monerojs = require("monero-javascript");
if (monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("C:") == 0 && monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("file://") == -1)
    monerojs.LibraryUtils.WORKER_DIST_PATH = "file://"+monerojs.LibraryUtils.WORKER_DIST_PATH;
main();
async function main() {
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    password: "0",
    serverUri: "http://stagenet.community.rino.io:38081",
    restoreHeight:  1184950,
    mnemonic: 'sack people folding mice ferry etched sifting ruffled elbow orphans village stunning nurse argue atom emulate deity antics swept dizzy fiat because zeal alchemy dizzy'
  });
  const isConnected = await walletFull.isConnectedToDaemon()
  console.log("wallet connection status: " + isConnected)
  await walletFull.sync(new class extends monerojs.MoneroWalletListener {
    onSyncProgress(height, startHeight, endHeight, percentDone, message) {
      console.log('percentDone: '+ percentDone)
      console.log('blockheight: ' + height)
      }
    });
  await walletFull.startSyncing(10000000);
  console.log(' ')
  const unlockedBalance = await walletFull.getUnlockedBalance()
  const blockTillFundsUnlock = await walletFull.getNumBlocksToUnlock()
  const totalBalance = await walletFull.getBalance()
  console.log('unlockedBalance: ' + unlockedBalance.toString())
  console.log('total balance:  ' + totalBalance)
  console.log('blocks for funds to unlock: ' + blockTillFundsUnlock[1])
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
