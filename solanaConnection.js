import { Connection } from "@solana/web3.js";
const RPC_URL = import.meta.env.VITE_BSSC_RPC;
export const connection = new Connection(RPC_URL, "confirmed");