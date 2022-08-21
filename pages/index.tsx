import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { News } from "./types/News";

// getServerSideProps 에서 return 값을 받아 사용
const Home: NextPage = (data) => {
  // 되긴 되는데, 빨간색...
  const newsList: News[] = data["data"]["articles"];

  return (
    <div className={styles.container}>
      <h1>Next JS</h1>
      <ul>
        {newsList.map((news, index) => (
          <li key={index}>
            <div>{news.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=bf9d4ea494024b88a8840dc1886dcbc5`
  );
  const data = await res.json();

  // data 없을 땐 리턴값을 달리함
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //pageProps로 넘길 데이터
  return { props: { data } };
};

export default Home;
