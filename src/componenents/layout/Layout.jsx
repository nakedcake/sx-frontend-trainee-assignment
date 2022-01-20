import React from "react";
import { routes } from "../../routes";
import { Link } from "../common/Link";
import { Container } from "../container/Container";

import s from "./Layout.module.css";

export const Layout = ({ children }) => (
  <div>
    <Container>
      <ul>
        <li>
          <Link href={routes.app.index.getRoute()}>Home</Link>
        </li>
      </ul>
    </Container>
    <main className={s.root}>
      <Container>{children}</Container>
    </main>
  </div>
);
