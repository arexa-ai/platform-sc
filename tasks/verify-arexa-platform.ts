import { task } from "hardhat/config";
import { getAREXASmartContracts } from "./utils/utils";

task("verify-arexa-platform", "Verify AREXA Platform").setAction(async (_taskArg, hre) => {
	const arexa = await getAREXASmartContracts(hre);

	arexa.diamondInitializer.address;

	const verifyParams: { address: string; constructorArguments?: any[]; contract?: string }[] = [];

	const desc = arexa.deploymentDescriptor;

	const diamondCutFacetAddress = (await hre.deployments.get(desc.diamondCutFacet.name)).address;

	verifyParams.push({ address: diamondCutFacetAddress });
	verifyParams.push({
		address: (await hre.deployments.get(desc.diamond.name)).address,
		constructorArguments: [arexa.ownerSignerAddress, diamondCutFacetAddress],
	});
	verifyParams.push({ address: (await hre.deployments.get(desc.initializer.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.diamondLoupeFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.diamondEtherscanFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.ownershipFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.pausableFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.aclFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.adminFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.amlFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.platformFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.platformAdminFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.poolPNLFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.restrictionFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.stakingFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenAllowanceFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenEnumerableFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenMetadataURIFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenReceiverFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.diamondDummyImplementation.name)).address });

	for (let i = 0; i < verifyParams.length; i++) {
		const verifyParam = verifyParams[i];
		await hre.run("verify:verify", verifyParam);
	}
});
