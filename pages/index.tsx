import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

import { News } from "./types/News";

// getServerSideProps 에서 return 값을 받아 사용
const Home: NextPage = (data) => {
  // 되긴 되는데, 빨간색...
  // const newsList: News[] = data["data"]["articles"];
  // const [articles, setArticles] = useState(null);

  // const newsList: News[] = data.articles;

  return (
    <div className={styles.container}>
      <h1>Next JS</h1>
      <ul>
        {/* {newsList.map((news, index) => (
          <li key={index}>
            <div>{news.title}</div>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { data } = await ( await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=kr&apiKey=bf9d4ea494024b88a8840dc1886dcbc5`
  // )).json();

  const data = {
    status: "ok",
    totalResults: 34,
    articles: [
      {
        source: {
          id: null,
          name: "Medifonews.com",
        },
        author: null,
        title: "상위 제약사, 매출의 0.24 접대비로 지출해 - 메디포뉴스",
        description:
          "상위 제약사들이 매출의 0.24를 접대비로 이용하는 것으로 나타났다. 전자공시를 통해 확인된 제약사들의 반기보고서 분석 결과 상위 50개 제약사들 중 35개 제약사에서 접대비 지출 현황을 공개했다. 접대비 지출 현황이 공개된 제약사들의 2022년 상반기 매출액은 약 6조 2183억원으로 매출의 0.24인 149억 3400만원을 상반기에 접대비로 사용했다.",
        url: "http://www.medifonews.com/news/article.html?no=169327",
        urlToImage:
          "http://www.medifonews.com/data/photos/20220833/art_16610850011486_78370c.png",
        publishedAt: "2022-08-21T20:27:13Z",
        content:
          "0.24% .\r\n 50 35 .\r\n 2022 6 2183 0.24% 149 3400 . \r\n 2021 5 4341 0.23% 127 4600 .\r\n2022 4 8938 0.05% . 2021 3 0.04% .\r\n 4 2021 2022 . 0.07% 4 1 13% 5300 .\r\n6 0.01% . 1 800, 2 900 .\r\n10 . 0.05% 1 4000 … [+456 chars]",
      },
      {
        source: {
          id: null,
          name: "Yonhapnewstv.co.kr",
        },
        author: null,
        title:
          "한미연합 본훈련 UFS 오늘 시작…4년만에 대규모 야외기동훈련 - 연합뉴스TV",
        description:
          "한미연합 본훈련 UFS 오늘 시작…4년만에 대규모 야외기동훈련\n\n[앵커]\n\n후반기 한미연합연습인 '을지 프리덤 실드' 본연습이 오늘(22일)부터 다음달 1일까지 실시됩니다.\n\n새",
        url: "https://www.yonhapnewstv.co.kr/news/MYH20220822000300640",
        urlToImage:
          "https://yonhapnewstv-prod.s3.ap-northeast-2.amazonaws.com/article/MYH/20220821/MYH20220822000300640_P1.jpg",
        publishedAt: "2022-08-21T20:22:04Z",
        content:
          "<ul><li>()TV 2()\r\n</li><li> : </li><li> : 02-398-7800</li><li> : 101-86-62619</li></ul>\r\nCopyright 2019 © TV :: . 23 All rights reserved.\r\n () , ·· .",
      },
    ],
  };

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
  return {
    props: {
      data: {
        data
      },
    },
  };
};

export default Home;
