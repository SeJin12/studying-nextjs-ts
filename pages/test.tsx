import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testAction } from "../store/modules/test";


import {defaultPost} from '../lib/Axios/Common';


const Test = () => {
  const [text, setText] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const name = useSelector((state: any) => state.test);

  useEffect(() => {
    const ret = defaultPost('/api/hello', undefined).then(res => {
      console.log('POST response', res);
    });
    
    // (async () => {
    //   const ret = await 
    //   const results = await (
    //     await fetch(
    //       `/api/hello`
    //     )
    //   ).json();
    //   console.log(results);
    // })();

    // console.log(name);
  }, [name]);

 

  const dispatch = useDispatch();
  const onDispatch = () => dispatch(testAction(text));

  return (
    <div>
      {text}
      <br />
      <input onChange={onChange} placeholder="input your message." />
      <button onClick={onDispatch}>Button</button>
      <ul>
        {name.map((v: string, index: number) => (
          <li key={index}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
