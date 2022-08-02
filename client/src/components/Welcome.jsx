import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Welcome = () => {
  const { connectWallet, connectedAccount, sendTransaction } =
    useContext(TransactionContext);
  const [inp, setInp] = useState({
    address: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInp((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { address, amount, keyword, message } = inp;
    sendTransaction(address, amount, message, keyword);
  };
  return (
    <div>
      {!connectedAccount && <button onClick={connectWallet}>Connect</button>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="amount"
          onChange={handleChange}
          placeholder="Amount"
        />
        <input
          type="text"
          name="message"
          onChange={handleChange}
          placeholder="Message"
        />
        <input
          type="text"
          name="keyword"
          onChange={handleChange}
          placeholder="Keyword"
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Welcome;
