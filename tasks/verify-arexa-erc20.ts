import { task } from "hardhat/config";
import { getRXAISmartContracts } from "./utils/utils";

task("verify-arexa-erc20", "Verify AREXA ERC20 Diamond").setAction(async (_taskArg, hre) => {
	const rxai = await getRXAISmartContracts(hre);

	rxai.diamondInitializer.address;

	const verifyParams: { address: string; constructorArguments?: any[]; contract?: string }[] = [];

	const desc = rxai.deploymentDescriptor;

	const diamondCutFacetAddress = (await hre.deployments.get(desc.diamondCutFacet.name)).address;

	verifyParams.push({ address: diamondCutFacetAddress });
	verifyParams.push({
		address: (await hre.deployments.get(desc.diamond.name)).address,
		constructorArguments: [rxai.ownerSignerAddress, diamondCutFacetAddress],
	});
	verifyParams.push({ address: (await hre.deployments.get(desc.initializer.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.diamondLoupeFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.diamondEtherscanFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.ownershipFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.pausableFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.aclFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.adminFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.amlFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.facets.tokenFacet.name)).address });
	verifyParams.push({ address: (await hre.deployments.get(desc.diamondDummyImplementation.name)).address });

	for (let i = 0; i < verifyParams.length; i++) {
		const verifyParam = verifyParams[i];
		await hre.run("verify:verify", verifyParam);
	}
});
