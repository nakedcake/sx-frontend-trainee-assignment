import React from "react";
import cn from "clsx";
import s from "./ButtonBase.module.css";

export const ButtonBase = ({ children, className, ...rest }) => (
  <button className={cn(s.root, className)} {...rest}>
    {children}
  </button>
);
