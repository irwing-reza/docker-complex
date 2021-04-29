import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
  });
  const [index, setIndex] = useState("");

  useEffect(() => {
    const fetchValues = async () => {
      const values = await axios.get("/api/values/current");
      const seenIndexes = await axios.get("/api/values/all");
      setState({
        seenIndexes: seenIndexes.data,
        values: values.data,
      });
    };
    fetchValues();
  }, []);

  const seenIndexes = useMemo(
    () => state.seenIndexes.map(({ number }) => number).join(", "),
    [state.seenIndexes]
  );

  const valuesList = useMemo(() => {
    const entries = [];
    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }
    return entries;
  }, [state.values]);

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Enter your index:</label>
        <input
          type="text"
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes}
      <h3>Calculated values:</h3>
      {valuesList}
    </div>
  );
};

export default Fib;
