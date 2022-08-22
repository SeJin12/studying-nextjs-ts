import Link from "next/link";
import React from "react";
// import navStyles from "../../../styles/Nav.module.css";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/test">
            <a>test</a>
          </Link>
        </li>
      </ul>
      <style jsx>
        {`
          nav {
            padding: 0.5rem 1rem;
            background: #416583;
          }
          ul {
            display: flex;
            list-style: none;
          }
          li {
            margin-right: 1rem;
            color: rgb(255, 255, 255);
          }
          a {
            color: #ffffff;
          }
        `}
      </style>
    </nav>
  );
};

export default Nav;
