import React, { useEffect, useState } from "react";
import { defaultGet } from "../../../lib/Axios/Common";

type Wallet = {
    currency: string,
    balance: string,
    locked: string,
    avg_buy_price: string,
    avg_buy_price_modified: boolean,
    unit_currency: string
}

const Wallet = () => {
  const [datas, setDatas] = useState<Wallet[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDatas = async () => {
    try {
      setError(null);
      setDatas(null);
      setLoading(true);

      const { data } = await defaultGet(
        `/upbit/v1/accounts`,
        {}
      );
      console.log(data);

      setDatas(data);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!datas) return <div>data NULL</div>;

  return (
    <div>
      <span>Wallet</span>
      {datas.map((data:Wallet) => (
        <li key={data.currency}>{data.currency}</li>
      ))}
    </div>
  );
};

export default Wallet;
