import Irys from "@irys/sdk";
import { WarpFactory, defaultCacheOptions } from "warp-contracts";
import Arweave from "arweave";

const ANT = "7Q_92xxEGJ6HkBop11D0gWLS-cW6gODpbv9RN71Hq8I";
const DEPLOY_FOLDER = "./out";
const IRYS_NODE = "https://node2.irys.xyz";

const jwk = JSON.parse(Buffer.from(process.env.KEY, "base64").toString("utf-8"));
const arweave = Arweave.init({ host: "arweave.net", port: 443, protocol: "https" });
const irys = new Irys({ url: IRYS_NODE, token: "arweave", key: jwk });
const warp = WarpFactory.custom(arweave, defaultCacheOptions, "mainnet").useArweaveGateway().build();

const contract = warp.contract(ANT).connect(jwk);
// upload folder
const result = await irys.uploadFolder(DEPLOY_FOLDER, {
	indexFile: "index.html",
});

// update ANT
await contract.writeInteraction({
	function: "setRecord",
	subDomain: "@",
	transactionId: result.id,
});

console.log("Deployed permaweb, please wait 20 - 30 minutes for ArNS to update!");