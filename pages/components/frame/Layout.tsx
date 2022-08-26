import React from "react";
import HeaderInfo from "./HeaderInfo";
import Nav from "./Nav";

export type Props = {
  children: JSX.Element;
};

const Layout = (props: Props) => {
  return (
    <div>
      <HeaderInfo />
      <Nav />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
