import React, { useState } from "react";

const Welcome = () => {
  const connectWallet = () => {};
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
  };
  return (
    <div>
      <button onClick={connectWallet}>Connect</button>

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
          name="keyword"
          onChange={handleChange}
          placeholder="Keyword"
        />
        <input
          type="text"
          name="message"
          onChange={handleChange}
          placeholder="Message"
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Welcome;
