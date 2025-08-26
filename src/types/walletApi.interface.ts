export interface WalletBalance {
  data: {
    balance: number;
    currency: string;
    lastUpdated: string;
  };
}

export interface DepositRequest {
  amount: number;
  agentId: string;
  method: "cash" | "bank";
}

export interface WithdrawRequest {
  amount: number;
  agentId?: string;
  method: "cash" | "bank";
}

export interface SendMoneyRequest {
  recipientId: string;
  amount: number;
  note?: string;
}


// walletApi.interface.ts

// export interface WalletBalance {
//   balance: number;
// }

// export interface DepositRequest {
//   amount: number;
//   agentId: string; // Example, you can add more details if needed
//   method: string; // "cash", "bank", etc.
// }

// export interface WithdrawRequest {
//   amount: number;
//   method: string; // "agent", "atm", etc.
// }

// export interface SendMoneyRequest {
//   contact: string; // Recipient's phone number or email
//   amount: number;
// }
