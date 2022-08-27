import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { fetcher } from "@lib/Axios/Common";

const Test = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_UPBIT_API}/v1/market/all`,
    fetcher
  );

  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_UPBIT_API}/v1/market/all`,
  //   fetcher
  // );

  const [coins, setCoins] = useState([]);

  const onCheck = () => {
    console.log(data);
  };

  if (!coins) {
    setCoins(data);
  }

  useEffect(() => {
    setCoins(data);
  }, [coins, data]);

  if (error)
    return (
      <div>
        <button onClick={onCheck}>check</button>
        failed to load
      </div>
    );
  if (!data || data === null)
    return (
      <div>
        <button onClick={onCheck}>check</button>loading...
      </div>
    );

  return (
    <div>
      <button onClick={onCheck}>check</button>
      <ul>
        {coins && coins.map((c: any, i: number) => <li key={i}>{c.market}</li>)}
      </ul>
    </div>
  );
};

export default Test;
