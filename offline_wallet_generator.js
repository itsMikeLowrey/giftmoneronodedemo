const monerojs = require("monero-javascript");
if (monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("C:") == 0 && monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("file://") == -1)
    monerojs.LibraryUtils.WORKER_DIST_PATH = "file://"+monerojs.LibraryUtils.WORKER_DIST_PATH;
main();
async function main() {
  // let daemon = await monerojs.connectToDaemonRpc({uri: "https://stagenet.xmr.ditatompel.com" , proxyToWorker: false,});
  // let test = await daemon.getTx('9780cf85b176e3ac153af1536d01727ed1801f24f6782656e7bb66f29f3d48ae')
  // console.log(test)
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    serverUri: "https://stagenet.xmr.ditatompel.com",
    // proxyToWorker: false,
    restoreHeight: 1165386,
    password: "0",
    mnemonic: 'zebra cuddled boss listen slower pencil hatchet eden tilt offend yeti tirade narrate seasons abyss copy sowed foes agreed behind judge gesture warped were abyss'
  });
  let ans = await walletFull.isConnectedToDaemon()
  let trip = await walletFull.getDaemonConnection()
  let h = await walletFull.getHeight()
  console.log(ans, trip, h)
  // synchronize with progress notifications
  // await walletFull.sync(new class extends monerojs.MoneroWalletListener {
  //   onSyncProgress(height, startHeight, endHeight, percentDone, message) {
  //     // feed a progress bar?
  //   }
  // });

// // synchronize in the background every 5 seconds
// await walletFull.startSyncing(5000);
//
// // receive notifications when funds are received, confirmed, and unlocked
// let fundsReceived = false;
// await walletFull.addListener(new class extends monerojs.MoneroWalletListener {
//   onOutputReceived(output) {
//     let amount = output.getAmount();
//     let txHash = output.getTx().getHash();
//     let isConfirmed = output.getTx().isConfirmed();
//     let isLocked = output.getTx().isLocked();
//     fundsReceived = true;
//   }
// });

// await walletFull.close(true);
  // const baseAddress = await walletFull.getAddress(0, 0)
  // const balance = await walletFull.getBalance(0, 0)
  // console.log(baseAddress)
  // console.log(balance.toString())
}
