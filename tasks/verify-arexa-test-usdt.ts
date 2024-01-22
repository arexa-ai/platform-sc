import { task } from "hardhat/config";
import { getUSDTSmartContracts } from "./utils/utils";

task("verfiy-arexa-test-usdt", "Verify AREXA Test USDT").setAction(async (_taskArg, hre) => {
	if (hre.network.name !== "goerli") {
		throw new Error("Not supported or not implemented on this network!");
	}
	const rxai = await getUSDTSmartContracts(hre);

	const verifyParams: { address: string; constructorArguments?: any[] }[] = [];

	const desc = rxai.deploymentDescriptor!;

	const diamondCutFacetAddress = (await hre.deployments.get(desc.diamondCutFacet.name)).address;

	verifyParams.push({ address: diamondCutFacetAddress });
	verifyParams.push({
		address: (await hre.deployments.get(desc.diamond.name)).address,
		constructorArguments: [rxai.ownerSignerAddress, diamondCutFacetAddress],
	});
	verifyParams.push({ address: (await hre.deployments.get(desc.initializer.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.diamondLoupeFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.ownershipFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.pausableFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.aclFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.adminFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.amlFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenFacet.name)).address });

	for (let i = 0; i < verifyParams.length; i++) {
		const verifyParam = verifyParams[i];
		await hre.run("verify:verify", verifyParam);
	}
});
