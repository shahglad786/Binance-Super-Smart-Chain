import { useState } from "react";
import { getTransactionInfo } from "./solanaConnection";
import { explainTransactionWithGemini } from "./aiAssistant";
import { WalletConnect } from "./components/WalletConnect";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export default function App() {
  const [txSig, setTxSig] = useState("");
  const [txDetails, setTxDetails] = useState(null);
  const [aiExplanation, setAiExplanation] = useState("");
  async function handleFetch() {
    const tx = await getTransactionInfo(txSig);
    setTxDetails(tx);
    const explanation = await explainTransactionWithGemini(tx);
    setAiExplanation(explanation);
  }
  return (
    <WalletConnect>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">BSSC AI Transaction Assistant</h1>
        <WalletMultiButton className="mb-4" />
        <input className="border p-2 w-full mb-4" placeholder="Enter transaction signature" value={txSig} onChange={(e) => setTxSig(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleFetch}>Fetch & Explain</button>
        {txDetails && (<div className="mt-6 p-4 border rounded"><pre>{JSON.stringify(txDetails, null, 2)}</pre><div className="mt-4 bg-gray-100 p-3 rounded">{aiExplanation}</div></div>)}
      </div>
    </WalletConnect>
  );
}
