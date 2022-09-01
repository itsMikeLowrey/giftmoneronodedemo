const monerojs = require("monero-javascript");
if (monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("C:") == 0 && monerojs.LibraryUtils.WORKER_DIST_PATH.indexOf("file://") == -1)
    monerojs.LibraryUtils.WORKER_DIST_PATH = "file://"+monerojs.LibraryUtils.WORKER_DIST_PATH;
main();
async function main() {
  // let daemon = await monerojs.connectToDaemonRpc({uri: "https://stagenet.xmr.ditatompel.com" , proxyToWorker: false,});
  // let test = await daemon.getTx('9780cf85b176e3ac153af1536d01727ed1801f24f6782656e7bb66f29f3d48ae')
  // console.log(test)
  // let daemon = await monerojs.connectToDaemonRpc("https://stagenet.xmr.ditatompel.com");
  // let height = await daemon.getHeight();            // 1523651
  // let feeEstimate = await daemon.getFeeEstimate();  // 1014313512
  // let txsInPool = await daemon.getTxPool();
  // console.log( height, feeEstimate, txsInPool)
  let walletFull = await monerojs.createWalletFull({
    networkType: "stagenet",
    serverUri: "http://node.sethforprivacy.com:38089",
    restoreHeight: 1165387,
    password: "0",
    mnemonic: 'zebra cuddled boss listen slower pencil hatchet eden tilt offend yeti tirade narrate seasons abyss copy sowed foes agreed behind judge gesture warped were abyss'
  });

  let ans = await walletFull.isConnectedToDaemon()
  console.log(ans)
  await walletFull.startSyncing(5000);
  async function execute1() {
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 9000));
      let yesd = await walletFull.getHeight()
      console.log(yesd)
      let bank = await walletFull.getBalance(0,0)
      console.log(bank.toString())
    }
  }

  execute1();
  let createdTx = await walletFull.createTx({
    accountIndex: 0,
    address: '73a4nWuvkYoYoksGurDjKZQcZkmaxLaKbbeiKzHnMmqKivrCzq5Q2JtJG1UZNZFqLPbQ3MiXCk2Q5bdwdUNSr7X9QrPubkn',
    amount: "250000000000", // send 0.25 XMR (denominated in atomic units)
    relay: true // create transaction and relay to the network if true
  });
  console.log('sent')
  let fee = await createdTx.getFee(); // "Are you sure you want to send... ?"
  await walletFull.relayTx(createdTx);
  console.log(fee)
  execute1();
  // execute1();
  //synchronize with progress notifications
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

  //await walletFull.close(true);
  // const baseAddress = await walletFull.getAddress(0, 0)
  // const balance = await walletFull.getBalance(0, 0)
  // console.log(baseAddress)
  // console.log(balance.toString())
}
