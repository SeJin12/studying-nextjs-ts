import React, { useEffect, useMemo, useRef, useState } from "react";
import { defaultGet, fetcher } from "@lib/Axios/Common";
// import { defaultGet } from "../../../lib/Axios/Common";
import { Market } from "@types/MarketInfo";
import { GetStaticProps } from "next";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HeaderInfo from "../frame/HeaderInfo";
import useSWR from "swr";

function countFilter(
  originData: Market[],
  market: string,
  koreanName: string,
  englishName: string,
  marketWarning: string
) {
  return originData.filter(
    (data: Market) =>
      data.market !== "" &&
      data.market.includes(market.toUpperCase()) &&
      data.korean_name !== "" &&
      data.korean_name.includes(koreanName) &&
      data.english_name !== "" &&
      data.english_name.toUpperCase().includes(englishName.toUpperCase()) &&
      data.market_warning !== "" &&
      data.market_warning.includes(marketWarning.toUpperCase())
  ).length;
}

const Coin = ({ results }) => {

  const [market, setMarket] = useState<string>("");
  const [koreanName, setKoreanName] = useState<string>("");
  const [englishName, setEnglishName] = useState<string>("");
  const [marketWarning, setMarketWarning] = useState<string>("");
  const [searchData, setSearchData] = useState<Market[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const originData: Market[] = results;
  const filterCount = useRef(results.length);

  const count = useMemo(
    () =>
      countFilter(originData, market, koreanName, englishName, marketWarning),
    [originData, market, koreanName, englishName, marketWarning]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "market") {
      setMarket(e.target.value);
    } else if (e.target.name === "korean_name") {
      setKoreanName(e.target.value);
    } else if (e.target.name === "english_name") {
      setEnglishName(e.target.value);
    } else if (e.target.name === "market_warning") {
      setMarketWarning(e.target.value);
    }
  };

  const columns: string[] = [
    "순번",
    "코드",
    "한글명",
    "영문명",
    "유의 종목(NONE/CAUTION)",
    "현재가",
  ];

  const onSearch = () => {
    setLoading(true);
    setSearchData(
      originData.filter(
        (data: Market) =>
          data.market !== "" &&
          data.market.includes(market.toUpperCase()) &&
          data.korean_name !== "" &&
          data.korean_name.includes(koreanName) &&
          data.english_name !== "" &&
          data.english_name.toUpperCase().includes(englishName.toUpperCase()) &&
          data.market_warning !== "" &&
          data.market_warning.includes(marketWarning.toUpperCase())
      )
    );
    filterCount.current = count;
    setLoading(false);
  };

  const onInit = () => {
    setLoading(true);
    setMarket("");
    setKoreanName("");
    setEnglishName("");
    setMarketWarning("");
    filterCount.current = originData.length;
    setSearchData(originData);
    setLoading(false);
  };

  useEffect(() => {
    if (!searchData) {
      setSearchData(originData);
      filterCount.current = count;
    }
    
  }, [originData, searchData]);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div>
      <HeaderInfo title="Coin List" />
      <Box
        component="form"
        sx={{
          border: "1px solid grey",
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-simple">코드</InputLabel>
          <Input
            id="component-simple"
            name="market"
            value={market}
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-simple">한글명</InputLabel>
          <Input
            id="component-simple"
            name="korean_name"
            value={koreanName}
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-simple">영문명</InputLabel>
          <Input
            id="component-simple"
            name="english_name"
            value={englishName}
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="component-simple">유의 종목</InputLabel>
          <Input
            id="component-simple"
            name="market_warning"
            value={marketWarning}
            onChange={handleChange}
            onKeyDown={handleOnKeyDown}
          />
        </FormControl>
        <Button variant="text" onClick={onSearch}>
          검색
        </Button>
        <Button variant="text" onClick={onInit}>
          초기화
        </Button>
      </Box>
      <p>검색 결과: {searchData && `${filterCount.current} / ${originData.length}`}</p>
      {loading && <CircularProgress />}
      {!loading && (
        <TableContainer sx={{ marginTop: "15px" }}>
          <Table
            sx={{ minWidth: 650, border: "1px solid grey" }}
            aria-label="table"
          >
            <TableHead>
              <TableRow>
                {columns.map((column: string, index: number) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!searchData && <p>Loading...</p>}
              {searchData &&
                searchData.map((data: Market, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.market}</TableCell>
                    <TableCell>{data.korean_name}</TableCell>
                    <TableCell>{data.english_name}</TableCell>
                    <TableCell>{data.market_warning}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <style jsx>
        {`
          div {
            margin: 40px;
          }
        `}
      </style>
    </div>
  );
};

/**
 * @description 변하지 않는 데이터를 불러올 때 사용함. 서버가 실행되면 .next/statc/server/pages 쪽에 미리 json 데이터를 생성하여 화면을 켰을때 파일을 바로 불러옴
 * @returns results
 */
export const getStaticProps: GetStaticProps = async () => {
  const results: Market = await defaultGet(
    `${process.env.UPBIT_API}/v1/market/all`,
    undefined
  ).then((res: any) => {
    return res.data;
  });

  return {
    props: {
      results,
    },
  };
};

export default Coin;
