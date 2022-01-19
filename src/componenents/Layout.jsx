import React from "react";
import { routes } from "../routes";
import { Link } from "./common/Link";

export const Layout = ({ children }) => (
  <div>
    <ul>
      <li>
        <Link href={routes.index.getRoute()}>Home</Link>
      </li>
    </ul>
    <main>{children}</main>
  </div>
);
