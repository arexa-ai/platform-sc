export type DeploymentItem = {
	name: string; //name of the deployed
	artifact: string;
};

export type DiamondDeploymentInit = DeploymentItem & {
	functionName: string;
	params: unknown[];
};

// export type DiamondDeploymentDescriptor = {
// 	diamond: DeploymentItem;
// 	diamondCutFacet: DeploymentItem;
// 	diamondInit: DeploymentItem;
// 	requiredFacets: Record<DiamondRequiredFacets, DeploymentItem>;
// 	requiredFacetsDeployInit: DiamondDeploymentInit;
// 	requiredFacetsUpgradeInit: DiamondDeploymentInit;
// 	businessFacets: Record<BlockBenTokenFacets, DeploymentItem>;
// 	businessFacetsDeployInit: DiamondDeploymentInit;
// 	businessFacetsUpgradeInit: DiamondDeploymentInit;
// };

export enum DiamondRequiredFacets {
	DiamondLoupeFacet = "diamondLoupeFacet",
	OwnershipFacet = "ownershipFacet",
}

export type DiamondDeploymentDescriptorNew<TBusinessFacets extends string> = {
	diamond: DeploymentItem;
	diamondCutFacet: DeploymentItem;
	facets: Record<DiamondRequiredFacets | TBusinessFacets, DeploymentItem>;
	initializer: DiamondDeploymentInit;
};
