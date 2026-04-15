import {type Sender } from "@ton/core";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  userAddress: string;
  disconnect: () => Promise<void>;
} {
  const [tonConnectUI] = useTonConnectUI();
  const TONAddress = useTonAddress(true);
  

  const sender: Sender = {
    async send(args) {
      await tonConnectUI.sendTransaction({
        messages: [
          {
            address: args.to.toString(),
            amount: args.value.toString(),
            payload: args.body?.toBoc().toString("base64"),

          },
        ],
        validUntil: Date.now() + (5 * 60) / 1000,
      });
    },
  };

  const disconnect = async () => {
    await tonConnectUI.disconnect();
  };

  return {
    sender,
    connected: tonConnectUI?.connected,
    userAddress: TONAddress,
    disconnect,
  };
}