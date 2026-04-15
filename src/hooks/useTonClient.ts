import { TonClient4 } from "@ton/ton";
// import type { ContractProvider } from "@ton/core";
import { useMemo } from "react";
// import { getConfig } from "@/lib/contract.config";

// Change to testnet if your factory contract is deployed there
// const MAINNET = "https://mainnet-v4.tonhubapi.com";
const TESTNET = "https://testnet-v4.tonhubapi.com";

// TODO: Set this to TESTNET if your contract is on testnet
const ENDPOINT = TESTNET;  // Change to MAINNET if on mainnet


// export function useTonClient(): ContractProvider {
//   const provider = useMemo(() => {
//     const client = new TonClient4({
//       endpoint: ENDPOINT,
//     });
//     const config = getConfig();
//     // TonClient4.provider() needs an Address to query
//     return client.provider(config.mainAddress);
//   }, []);

//   return provider;
// }




export function useTonClient() {
  const client = useMemo(() => {
    return new TonClient4({
      endpoint: ENDPOINT,
    });
  }, []);

  return client;
}