import React from "react";
import Head from "next/head";

interface Header {
  title?: string;
  keyword?: string;
  contents?: string;
}

const HeaderInfo = (props: Header) => {
  return (
        <Head>
            <title>{props.title}</title>
            <meta name="keyword" content={props.keyword} />
            <meta name="contents" content={props.contents} />
        </Head>
    )
};

HeaderInfo.defaultProps = {
  title: "Project ts",
  keyword: "meta keyword",
  contents: "meta contents",
};

export default HeaderInfo;
