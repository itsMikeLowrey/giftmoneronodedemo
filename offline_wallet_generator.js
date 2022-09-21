const monerojs = require("monero-javascript");
if (monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("C:") == 0 && monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("file://") == -1)
    monerojs.LibraryUtils.WORKER_DIST_PATH = "file://"+monerojs.LibraryUtils.WORKER_DIST_PATH;
main();
async function main() {
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    serverUri: "http://xmr-lux.boldsuck.org:38081",
    restoreHeight: 1165387,
    password: "0",
    // path: "test",
    mnemonic: 'zebra cuddled boss listen slower pencil hatchet eden tilt offend yeti tirade narrate seasons abyss copy sowed foes agreed behind judge gesture warped were abyss'
  });

  let ans = await walletFull.isConnectedToDaemon()
  console.log("wallet connection status: " + ans)
  await walletFull.sync(new class extends monerojs.MoneroWalletListener {
    onSyncProgress(height, startHeight, endHeight, percentDone, message) {
      console.log('percentDone: '+ percentDone)
      console.log('blockheight: ' + height)
      }
    });
  await walletFull.startSyncing(5000);
  const baseAddress = await walletFull.getAddress(0, 0)
  const balance = await walletFull.getBalance(0, 0)
  console.log('baseAddress:' + baseAddress)
  console.log('balance:' + balance)
  // let txs = await walletFull.sweepUnlocked({
  //   address: "73a4nWuvkYoYoksGurDjKZQcZkmaxLaKbbeiKzHnMmqKivrCzq5Q2JtJG1UZNZFqLPbQ3MiXCk2Q5bdwdUNSr7X9QrPubkn",
  //   relay: false,
  //   priority: monerojs.MoneroTxPriority.ELEVATED,
  // });
  // console.log(txs[0].state)
  async function myFunctionThatCatches() {
    try {
        return await walletFull.close(true); // <-- Notice we added here the "await" keyword.
    } catch (e) {

    } finally {
        console.log('closing');
    }
    return "Nothing found";
}
  await myFunctionThatCatches()
  process.exit();
}
