import { ethers } from "ethers";
import type { ContractInterface } from "ethers";
import { useEffect } from "react";
import { packAddress } from "../lib/contractAddresses";
import packABI from "../utils/PackABI.json";
import { useWeb3 } from "@3rdweb/hooks";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function usePackEvents() {
  const { address, provider } = useWeb3(); // 'address' this is the connected wallet,

  useEffect(() => {
    if (provider) {
      const abi = packABI as ContractInterface;
      const packContract = new ethers.Contract(packAddress, abi, provider);
      //We add an event listener using packContract.on . The event we’re listening for is called TransferSingle
      packContract.on("TransferSingle", (_operator, _from, to, _id, _value) => { // 'TransferSingle' is the event emitted by Pack Contract
        // when nft reward is received by user
        if (to === address) {
            toast.success(
              <div className="flex flex-col gap-2">
                <p className="text-green-800">
                  {" "}
                  Congratulations! You were awarded a Godly pack!
                </p>
                <p>
                  View and open it in the{" "}
                  <Link href="/lounge">
                    <a className="underline hover:no-underline">lounge</a>
                  </Link>
                  !
                </p>
              </div>,
              {
                duration: 5000,
              }
            );
          }
      });
    }
  }, [!!provider]); // The dependency array [!!provider] means we’re only going to add the event handler when provider goes from unset to set.
}