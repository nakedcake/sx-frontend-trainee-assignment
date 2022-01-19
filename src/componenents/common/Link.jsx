import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";

export const Link = ({ href, ...rest }) => (
  <ReactRouterLink to={href} {...rest} />
);
