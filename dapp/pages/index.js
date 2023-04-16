import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import Web3 from "web3";

import Votes from "@/components/votes";
import abi from "@/voting.abi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [candidateName, setCandidateName] = useState("");
  const [votes, showVotes] = useState(false);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState();

  useEffect(() => {
    const web3auth = new Web3Auth({
      clientId:
        "BLy2wGQ4Wqv17v5UEFCOzEaZa2LrFVPjMiLCJip-72L8qx1nVBypAjPOVfVap-OgQa1zOg1An9ueJp3eIKlDKlw", // get it from Web3Auth Dashboard
      web3AuthNetwork: "cyan",
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0xaef3", // hex of 42220, Celo Alfajores testnet
        rpcTarget: "https://rpc.ankr.com/celo",
        // Avoid using public rpcTarget in production.
        // Use services like Infura, Quicknode etc
        displayName: "Celo Testnet",
        blockExplorer: "https://alfajores-blockscout.celo-testnet.org",
        ticker: "CELO",
        tickerName: "CELO",
      },
    });

    const authenticateUser = async () => {
      await web3auth.initModal();

      const provider = await web3auth.connect();

      setProvider(provider)

      const web3 = new Web3(provider);

      const address = await web3.eth.getAccounts();
      console.log(address);
      setAddress(address[0]);
    };

    authenticateUser();
  });

  const vote = async (e) => {
    e.preventDefault();
    const web3 = new Web3(provider);

    const contract = new web3.eth.Contract(abi, "0xE7bE545189aa2EA3aE887a9b90AE05AD6D496596");
    console.log(contract);
    const result = await contract.methods.vote(candidateName).send({from: address});
    console.log(result);
  }

  return (
    <>
      {address ? (
        <div className="relative">
          <div className="text-end px-4 py-2">
            <button
              className="bg-green-500 p-2 rounded-md"
              onClick={() => showVotes(true)}
            >
              See votes
            </button>
          </div>
          <main className="flex flex-col justify-center items-center py-2 h-[555px]">
            <h2 className="text-xl font-semibold">
              Vote For Your Preferred Candidate
            </h2>
            <div className="mt-4">
              <form onSubmit={vote}>
                <div className="w-[300px] rounded-md">
                  <input
                    type="text"
                    className="outline-none rounded-md p-2 text-black w-full"
                    placeholder="Enter candidate name"
                    onChange={(e) => setCandidateName(e.target.value)}
                  />
                </div>
                <div className="text-center mt-5">
                  <button className="bg-blue-500 rounded-md py-2 px-4">
                    Vote Candidate
                  </button>
                </div>
              </form>
            </div>
          </main>
          {votes ? <Votes onClose={() => showVotes(false)} provider={provider} /> : null}
        </div>
      ) : (
        null
      )}
    </>
  );
}
