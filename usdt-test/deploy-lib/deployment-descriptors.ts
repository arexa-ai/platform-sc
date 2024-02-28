export type DeploymentItem = {
	name: string; //name of the deployed
	artifact: string;
};

export type DiamondDeploymentInit = DeploymentItem & {
	functionName: string;
	params: unknown[];
};

export enum DiamondRequiredFacets {
	DiamondLoupeFacet = "diamondLoupeFacet",
	DiamondEtherscanFacet = "diamondEtherscanFacet",
	OwnershipFacet = "ownershipFacet",
}

export type DiamondDeploymentDescriptorNew<TBusinessFacets extends string> = {
	diamond: DeploymentItem;
	diamondCutFacet: DeploymentItem;
	diamondDummyImplementation: DeploymentItem;
	facets: Record<DiamondRequiredFacets | TBusinessFacets, DeploymentItem>;
	initializer: DiamondDeploymentInit;
};
