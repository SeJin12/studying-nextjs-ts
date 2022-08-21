import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testAction } from "./lib/store/modules/test";

const test = () => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  };

  const name = useSelector((state) => state.test);

  useEffect(() => {
    console.log(name);
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
        {name.map((v, index) => (
          <li key={index}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

export default test;
