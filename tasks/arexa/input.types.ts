export type InputAddressParams = {
	address: string;
};

export type InputAddressTokenIdValueParams = {
	address: string;
	tokenid?: string;
	value: number;
};

export type InputAddressTokenId = {
	address: string;
	tokenid: string;
};

export type InputERC1155AllowanceParams = {
	address: string;
	tokenid: string;
	currvalue: number;
	newvalue: number;
};

export type InputERC1155Allowance2Params = {
	address: string;
	currvalue: number;
	newvalue: number;
};

export type InputValueParams = {
	value: number;
};

export type InputAddressValueParams = {
	address: string;
	value: number;
};

export type InputFromToAddressTokenIdValueParams = {
	from: string;
	to: string;
	tokenid?: string;
	value: number;
};

export type InputFromToAddressValueParams = {
	from: string;
	to: string;
	value: number;
};

export type InputCreateSubscription = {
	quantity: number;
	min: number;
	max: number;
};
