import React from "react";
import { Stories } from "../stories";
import s from "./IndexPage.module.css";

export const IndexPage = (props) => (
  <div className={s.root}>
    <Stories />
  </div>
);
