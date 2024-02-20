import { types } from "hardhat/config";
import { arexaAdminScope } from "../arexa.scope";
import { All } from "../../utils/input.types";
import { call } from "../../utils/helper.call";
import { getAREXASmartContracts } from "../../utils/utils";

arexaAdminScope
	.task("meta:set:uri", "Set Metadata URL")
	.addParam("uri", "Metadata URL of the contract", undefined, types.string)
	.setAction(async (params: Pick<All, "uri">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenMetadataURIFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.setURI(params.uri));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("meta:set:baseUri", "Set base metadata URL for tokens")
	.addParam("uri", "Base metadata URL of the contract", undefined, types.string)
	.setAction(async (params: Pick<All, "uri">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenMetadataURIFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.setTokenBaseURI(params.uri));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope
	.task("meta:set:tokenUri", "Set metadata URL part for tokens")
	.addParam("tokenid", "TokenId", undefined, types.string)
	.addParam("uri", "Metadata URL part of the token", undefined, types.string)
	.setAction(async (params: Pick<All, "tokenid" | "uri">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenMetadataURIFacet.connect(arexa.signers[2]);
		const result = await call(hre, contract.setTokenURI(params.tokenid, params.uri));
		await hre.run("print", { message: ` TX: ${result.hash}` });
	});

arexaAdminScope.task("meta:get:uri", "Get contract URL").setAction(async (params: undefined, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const contract = arexa.pfmTokenMetadataURIFacet;
	contract.getUri();
	const result = await contract.getUri();
	await hre.run("print", { message: `${result}` });
});

arexaAdminScope.task("meta:get:baseUri", "Get base metadata URL for tokens").setAction(async (params: undefined, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const contract = arexa.pfmTokenMetadataURIFacet;
	const result = await contract.getTokenBaseUri();
	await hre.run("print", { message: `${result}` });
});

arexaAdminScope
	.task("meta:get:tokenUri", "Get base metadata URL for tokens")
	.addParam("tokenid", "TokenId", undefined, types.string)
	.setAction(async (params: Pick<All, "tokenid">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenMetadataURIFacet;
		const result = await contract.getTokenUri(params.tokenid);
		await hre.run("print", { message: `${result}` });
	});

arexaAdminScope.task("meta:get:contract-url", "Get contract URL").setAction(async (params: undefined, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const contract = arexa.pfmTokenMetadataURIFacet;
	contract.getUri();
	const result = await contract.getUri();
	await hre.run("print", { message: `${result}` });
});

arexaAdminScope
	.task("meta:get:url", "Get token URL")
	.addParam("tokenid", "TokenId", undefined, types.string)
	.setAction(async (params: Pick<All, "tokenid">, hre) => {
		const arexa = await getAREXASmartContracts(hre);
		const contract = arexa.pfmTokenMetadataURIFacet;
		const result = await contract.uri(params.tokenid);
		await hre.run("print", { message: `${result}` });
	});

arexaAdminScope.task("meta:get:tokeninfo", "Get TokenIds").setAction(async (params: undefined, hre) => {
	const arexa = await getAREXASmartContracts(hre);
	const contract = arexa.platformFacet;
	const oracleMask = await contract.SUBSCR1_TOKEN_TYPE();
	const oracleTokenId = await contract.getCurrentSubscriptionTokenId(oracleMask);
	const edgeMask = await contract.SUBSCR2_TOKEN_TYPE();
	const edgeTokenId = await contract.getCurrentSubscriptionTokenId(edgeMask);
	const traderTokenId = await contract.TRADER_TOKEN_ID();
	const arexaTokneId = await contract.AREXA_TOKEN_ID();
	const magicTokneId = await contract.MAGIC_TOKEN_ID();

	await hre.run("print", { message: `Oracle:   ${oracleMask}, ${oracleTokenId}` });
	await hre.run("print", { message: `Edge:     ${edgeMask}, ${edgeTokenId}` });
	await hre.run("print", { message: `Trader:   ${traderTokenId}` });
	await hre.run("print", { message: `AREXA AI: ${arexaTokneId}` });
	await hre.run("print", { message: `Magic100: ${magicTokneId}` });
});
