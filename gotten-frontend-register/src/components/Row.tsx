import React, { HtmlHTMLAttributes } from "react";
import { css } from "@emotion/css";
import clsx from "clsx";

type OwnProps = {};
type BaseProps = HtmlHTMLAttributes<HTMLDivElement>;
export type RowProps = BaseProps & OwnProps;

const Row: React.FC<RowProps> = (props) => {
  const { className, ...rest } = props;
  return <div className={clsx(baseClassName, className)} {...rest} />;
};

const baseClassName = css`
  display: flex;
  flex-direction: row;
`;

export default Row;
