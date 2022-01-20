import React from "react";
import { routes } from "../../routes";
import { Link } from "../common/Link";

import s from "./Container.module.css";

export const Container = ({ children }) => (
  <div className={s.root}>
    <div className={s.content}>{children}</div>
  </div>
);
