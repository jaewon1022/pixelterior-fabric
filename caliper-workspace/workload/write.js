"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

class ReadWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  // async initializeWorkloadModule(
  //   workerIndex,
  //   totalWorkers,
  //   roundIndex,
  //   roundArguments,
  //   sutAdapter,
  //   sutContext
  // ) {
  //   await super.initializeWorkloadModule(
  //     workerIndex,
  //     totalWorkers,
  //     roundIndex,
  //     roundArguments,
  //     sutAdapter,
  //     sutContext
  //   );

  //   for (let i = 1; i <= this.roundArguments.assets; i++) {
  //     const assetId = `${this.workerIndex}-${i}`;
  //     const tokenSymbol = `TTN${assetId}`;

  //     console.log(
  //       `Creating asset "${this.workerIndex}-${i}" by workerNode ${workerIndex}`
  //     );

  //     let txArgs = {
  //       contractId: this.roundArguments.contractId,
  //       contractFunction: "mint",
  //       invokerIdentity: "client",
  //       contractArguments: [assetId, tokenSymbol, "100", "user1"],
  //       readOnly: false,
  //     };

  //     await this.sutAdapter.sendRequests(txArgs);
  //   }
  // }

  async submitTransaction() {
    const randomId = Math.floor(Math.random() * this.roundArguments.assets) + 1;
    const assetId = `${this.workerIndex}-${randomId}`;
    const tokenSymbol = `TTN${assetId}`;

    let txArgs = {
      contractId: this.roundArguments.contractId,
      contractFunction: "mint",
      invokerIdentity: "client",
      contractArguments: [assetId, tokenSymbol, "100", "user1"],
      readOnly: false,
    };

    return this.sutAdapter.sendRequests(txArgs);
  }

  // async cleanupWorkloadModule() {
  //   for (let i = 1; i <= this.roundArguments.assets; i++) {
  //     const assetId = `${this.workerIndex}-${i}`;

  //     console.log(
  //       `Deleting asset "${assetId}" by workerNode ${this.workerIndex}`
  //     );

  //     let txArgs = {
  //       contractId: this.roundArguments.contractId,
  //       contractFunction: "deleteAsset",
  //       invokerIdentity: "client",
  //       contractArguments: [assetId],
  //       readOnly: false,
  //     };

  //     await this.sutAdapter.sendRequests(txArgs);
  //   }
  // }
}

function createWorkloadModule() {
  return new ReadWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
