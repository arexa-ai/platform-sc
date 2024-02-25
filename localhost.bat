call npx hardhat deploy --network localhost

call npx hardhat arexa-admin meta:set:baseUri --network localhost --uri https://bafybeicsvjxbr2njofcueeulwybn5qjak2covgsl5bhynjsqhqbfdcoqh4.ipfs.nftstorage.link/

call npx hardhat arexa-admin meta:set:tokenUri --network localhost --tokenid 100000000 --uri 1.json
call npx hardhat arexa-admin meta:set:tokenUri --network localhost --tokenid 200000000 --uri 2.json
call npx hardhat arexa-admin meta:set:tokenUri --network localhost --tokenid 300000000 --uri 3.json
call npx hardhat arexa-admin meta:set:tokenUri --network localhost --tokenid 400000000 --uri 4.json
call npx hardhat arexa-admin meta:set:tokenUri --network localhost --tokenid 500000000 --uri 5.json

call npx hardhat arexa-admin meta:set:uri --network localhost --uri https://bafybeicsvjxbr2njofcueeulwybn5qjak2covgsl5bhynjsqhqbfdcoqh4.ipfs.nftstorage.link/contract-metadata.json

