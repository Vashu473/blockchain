import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/Contants";
const { ethereum } = window;
export const TransactionContext = React.createContext({
  connectWallet: () => {},
  sendTransaction: (address, amount, message, keyword) => {},
});

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return transactionContract;
};
const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactioncount")
  );
  useEffect(() => {
    checkWallet();
  }, []);
  const connectWallet = async () => {
    if (!ethereum) return alert("Please install metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setConnectedAccount(accounts[0]);
  };
  const checkWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
        //
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum Object found");
    }
  };
  const sendTransaction = async (address, amount, message, keyword) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const transaction = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: address,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transationhash = await transaction.addToBlockChain(
        address,
        parsedAmount,
        message,
        keyword
      );
      console.log(`Loading ${transationhash.hash}`);
      await transationhash.wait();
      console.log(`Success ${transationhash.hash}`);
      const transactionCountt = await transaction.getTransactionCount();
      console.log("total trnsaction count", transactionCount);
      setTransactionCount(transactionCountt.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum Object found");
    }
  };
  return (
    <TransactionContext.Provider
      value={{ connectWallet, connectedAccount, sendTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionProvider;
