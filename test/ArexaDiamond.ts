import "@nomicfoundation/hardhat-chai-matchers";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { time, mine, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Contract } from "ethers";
import { getSelectors } from "../deploy-lib/diamond-utils";
import { DescriptorTypeArexa, getArexaDeploymentDescriptor } from "../deploy-lib/arexa-platform-deployment/arexa-deployment-descriptor";

describe("ArexaDiamond", function () {
	async function deployDiamond() {
		await mine(1000);

		await deployments.fixture(["hArexaPlatformDiamond"]);

		const descriptor = getArexaDeploymentDescriptor(DescriptorTypeArexa.hAREXA);

		const diamond = await deployments.get(descriptor.diamond.name);

		const diamondCutFacet = await ethers.getContractAt(descriptor.diamondCutFacet.artifact, diamond.address);

		const facets = descriptor.facets;

		const diamondLoupeFacet = await ethers.getContractAt(facets.diamondLoupeFacet.artifact, diamond.address);
		const diamondEtherscanFacet = await ethers.getContractAt(facets.diamondEtherscanFacet.artifact, diamond.address);
		const arexaOwnershipFacet = await ethers.getContractAt(facets.ownershipFacet.artifact, diamond.address);
		//
		const arexaPausableFacet = await ethers.getContractAt(facets.pausableFacet.artifact, diamond.address);
		const arexaACLFacet = await ethers.getContractAt(facets.aclFacet.artifact, diamond.address);
		const arexaAdminFacet = await ethers.getContractAt(facets.adminFacet.artifact, diamond.address);
		const arexaAMLFacet = await ethers.getContractAt(facets.amlFacet.artifact, diamond.address);
		const arexaPlatformFacet = await ethers.getContractAt(facets.platformFacet.artifact, diamond.address);
		const arexaPlatformAdminFacet = await ethers.getContractAt(facets.platformAdminFacet.artifact, diamond.address);
		const arexaPoolPNLFacet = await ethers.getContractAt(facets.poolPNLFacet.artifact, diamond.address);
		const arexaRestrictionFacet = await ethers.getContractAt(facets.restrictionFacet.artifact, diamond.address);
		const arexaStakingFacet = await ethers.getContractAt(facets.stakingFacet.artifact, diamond.address);
		const arexaPfmTokenFacet = await ethers.getContractAt(facets.tokenFacet.artifact, diamond.address);
		const arexaPfmTokenAllowanceFacet = await ethers.getContractAt(facets.tokenAllowanceFacet.artifact, diamond.address);
		const arexaPfmTokenEnumerableFacet = await ethers.getContractAt(facets.tokenEnumerableFacet.artifact, diamond.address);
		const arexaPfmTokenMetadataURIFacet = await ethers.getContractAt(facets.tokenMetadataURIFacet.artifact, diamond.address);
		const arexaPfmTokenReceiverFacet = await ethers.getContractAt(facets.tokenReceiverFacet.artifact, diamond.address);
		return {
			diamondAddress: diamond.address,
			diamondCutFacet,
			diamondLoupeFacet,
			diamondEtherscanFacet,
			arexaOwnershipFacet,
			arexaPausableFacet,
			arexaACLFacet,
			arexaAdminFacet,
			arexaAMLFacet,
			arexaPlatformFacet,
			arexaPlatformAdminFacet,
			arexaPoolPNLFacet,
			arexaRestrictionFacet,
			arexaStakingFacet,
			arexaPfmTokenFacet,
			arexaPfmTokenAllowanceFacet,
			arexaPfmTokenEnumerableFacet,
			arexaPfmTokenMetadataURIFacet,
			arexaPfmTokenReceiverFacet,
		};
	}

	describe("Deployment", function () {
		it("Full diamond should have 8 facets -- call to facetAddresses function", async function () {
			const { diamondLoupeFacet } = await loadFixture(deployDiamond);
			const addresses = [];
			for (const address of await diamondLoupeFacet.facetAddresses()) {
				addresses.push(address);
			}
			expect(addresses.length).to.equal(18);
		});

		//Facets should have the right function selectors -- call to facetFunctionSelectors function
		it("Diamond facets should have the right function selectors -- call to facetFunctionSelectors function", async function () {
			const {
				diamondCutFacet,
				diamondLoupeFacet,
				diamondEtherscanFacet,
				arexaOwnershipFacet,
				arexaPausableFacet,
				arexaACLFacet,
				arexaAdminFacet,
				arexaAMLFacet,
				arexaPlatformFacet,
				arexaPlatformAdminFacet,
				arexaPoolPNLFacet,
				arexaRestrictionFacet,
				arexaStakingFacet,
				arexaPfmTokenFacet,
				arexaPfmTokenAllowanceFacet,
				arexaPfmTokenEnumerableFacet,
				arexaPfmTokenMetadataURIFacet,
				arexaPfmTokenReceiverFacet,
			} = await loadFixture(deployDiamond);

			const addresses: string[] = [];
			for (const address of await diamondLoupeFacet.facetAddresses()) {
				addresses.push(address);
			}
			const testFacetSelector = async (contract: Contract, index: number) => {
				const selectors = getSelectors(contract);
				const result = await diamondLoupeFacet.facetFunctionSelectors(addresses[index]);
				expect(result).to.eql(selectors); //to.have.members OR to.eql
			};

			await testFacetSelector(diamondCutFacet, 0);
			await testFacetSelector(diamondLoupeFacet, 1);
			await testFacetSelector(diamondEtherscanFacet, 2);
			await testFacetSelector(arexaOwnershipFacet, 3);
			await testFacetSelector(arexaPausableFacet, 4);
			await testFacetSelector(arexaACLFacet, 5);
			await testFacetSelector(arexaAdminFacet, 6);
			await testFacetSelector(arexaAMLFacet, 7);
			await testFacetSelector(arexaPlatformFacet, 8);
			await testFacetSelector(arexaPlatformAdminFacet, 9);
			await testFacetSelector(arexaPoolPNLFacet, 10);
			await testFacetSelector(arexaRestrictionFacet, 11);
			await testFacetSelector(arexaStakingFacet, 12);
			await testFacetSelector(arexaPfmTokenFacet, 13);
			await testFacetSelector(arexaPfmTokenAllowanceFacet, 14);
			await testFacetSelector(arexaPfmTokenEnumerableFacet, 15);
			await testFacetSelector(arexaPfmTokenMetadataURIFacet, 16);
			await testFacetSelector(arexaPfmTokenReceiverFacet, 17);
		});
	});
});
