import { subtask } from "hardhat/config";

subtask("print", "Prints a message")
	.addParam("message", "The message to print")
	.setAction(async (taskArgs) => {
		console.log(taskArgs.message);
	});

export * from "./verify-arexa-platform";
export * from "./verify-arexa-erc20";
export * from "./verify-arexa-test-usdt";
export * from "./block-number";
export * from "./arexa";
export * from "./usdt";
