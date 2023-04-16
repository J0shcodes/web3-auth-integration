import { useState } from "react";
import Web3 from "web3";

import abi from "@/voting.abi";

const Votes = (props) => {
  const [candidateName, setCandidateName] = useState("");
  const [votes, setVotes] = useState();

  const viewVotes = async (e) => {
    e.preventDefault();
    const web = new Web3(props.provider);

    const contract = new web.eth.Contract(
      abi,
      "0xE7bE545189aa2EA3aE887a9b90AE05AD6D496596"
    );

    const result = await contract.methods.getVotes(candidateName).call();
    console.log(result);
    setVotes(result);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-lg">
      <div
        className="text-end p-3 text-3xl font-thin cursor-pointer"
        onClick={props.onClose}
      >
        x
      </div>
      <div className="flex flex-col justify-center items-center h-[555px]">
        <form onSubmit={viewVotes}>
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
              View Votes
            </button>
          </div>
          {votes ? (
            <div className="text-center mt-3">
              {candidateName}: {votes} votes
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Votes;
