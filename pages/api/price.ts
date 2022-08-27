// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";
import { defaultGet } from "@lib/Axios/Common";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, query } = req;
  console.log(method, query);

  const request = async () => {
    try {
      const response = await defaultGet(
        `https://api.upbit.com/v1/ticker?markets=KRW-BTC`,
        undefined
      );
      const { headers, data } = await response;

      const check = headers["remaining-req"].split(";").map((v) => v.trim());
      const min = check[1].split("=")[1];
      const sec = check[2].split("=")[1];
      data[0].min = min;
      data[0].sec = sec;

      return res.status(200).json(data);
    } catch (e) {
      return res.status(404);
    }
  };

  request();
}
