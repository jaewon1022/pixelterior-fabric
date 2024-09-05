"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

class ReadWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(
    workerIndex,
    totalWorkers,
    roundIndex,
    roundArguments,
    sutAdapter,
    sutContext
  ) {
    await super.initializeWorkloadModule(
      workerIndex,
      totalWorkers,
      roundIndex,
      roundArguments,
      sutAdapter,
      sutContext
    );
  }

  async submitTransaction() {
    const randomId = Math.floor(Math.random() * this.roundArguments.assets) + 1;

    let txArgs = {
      contractId: this.roundArguments.contractId,
      contractFunction: "updateAsset",
      invokerIdentity: "client",
      contractArguments: [`${this.workerIndex}-${randomId}`, '100', '100000'],
      readOnly: false,
    };

    return this.sutAdapter.sendRequests(txArgs);
  }

  async cleanupWorkloadModule() {
  }
}

function createWorkloadModule() {
  return new ReadWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
