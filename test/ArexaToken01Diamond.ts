import "@nomicfoundation/hardhat-chai-matchers";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import { Contract } from "ethers";
import { getSelectors } from "../deploy-lib/diamond-utils";
import { zeroAddress } from "../deploy-lib/utils";
import { ArexaTokenFacet } from "../typechain-types";
import {
	DescriptorTypeToken,
	getArexaTokenDeploymentDescriptor,
} from "../deploy-lib/arexa-token-deployment/arexa-token-deployment-descriptor";

describe("ArexaTokenDiamond", function () {
	async function deployDiamond() {
		await deployments.fixture(["hRXAIDiamond"]);

		const descriptorToken = getArexaTokenDeploymentDescriptor(DescriptorTypeToken.hRXAI);

		const diamond = await deployments.get(descriptorToken.diamond.name);

		const diamondCutFacet = await ethers.getContractAt(descriptorToken.diamondCutFacet.artifact, diamond.address);

		const facets = descriptorToken.facets;
		const diamondLoupeFacet = await ethers.getContractAt(facets.diamondLoupeFacet.artifact, diamond.address);
		const ownershipFacet = await ethers.getContractAt(facets.ownershipFacet.artifact, diamond.address);
		const pausableFacet = await ethers.getContractAt(facets.pausableFacet.artifact, diamond.address);
		const aclFacet = await ethers.getContractAt(facets.aclFacet.artifact, diamond.address);
		const adminFacet = await ethers.getContractAt(facets.adminFacet.artifact, diamond.address);
		const amlFacet = await ethers.getContractAt(facets.amlFacet.artifact, diamond.address);
		const tokenFacet = await ethers.getContractAt(descriptorToken.facets.tokenFacet.artifact, diamond.address);
		return {
			diamondAddress: diamond.address,
			diamondCutFacet,
			diamondLoupeFacet,
			ownershipFacet,
			pausableFacet,
			tokenACLFacet: aclFacet,
			tokenAdminFacet: adminFacet,
			tokenAMLFacet: amlFacet,
			tokenFacet: tokenFacet as ArexaTokenFacet,
		};
	}

	describe("Deployment", function () {
		it("Full diamond should have 8 facets -- call to facetAddresses function", async function () {
			const { diamondLoupeFacet } = await loadFixture(deployDiamond);
			const addresses = [];
			for (const address of await diamondLoupeFacet.facetAddresses()) {
				addresses.push(address);
			}
			expect(addresses.length).to.equal(8);
		});

		it("Check name", async function () {
			const { tokenFacet } = await loadFixture(deployDiamond);
			const name = await tokenFacet.name();
			expect(name).to.be.equal("h Arexa AI");
		});

		//Facets should have the right function selectors -- call to facetFunctionSelectors function
		it("Diamond facets should have the right function selectors -- call to facetFunctionSelectors function", async function () {
			const {
				diamondCutFacet,
				diamondLoupeFacet,
				ownershipFacet,
				pausableFacet,
				tokenACLFacet,
				tokenAdminFacet,
				tokenAMLFacet,
				tokenFacet,
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
			await testFacetSelector(ownershipFacet, 2);
			await testFacetSelector(pausableFacet, 3);
			await testFacetSelector(tokenACLFacet, 4);
			await testFacetSelector(tokenAdminFacet, 5);
			await testFacetSelector(tokenAMLFacet, 6);
			await testFacetSelector(tokenFacet, 7);
		});
	});
});
