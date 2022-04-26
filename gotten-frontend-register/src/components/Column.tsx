import React, { HtmlHTMLAttributes } from "react";
import { css } from "@emotion/css";
import clsx from "clsx";

type OwnProps = {};
type BaseProps = HtmlHTMLAttributes<HTMLDivElement>;
export type ColumnProps = BaseProps & OwnProps;

const Column: React.FC<ColumnProps> = (props) => {
  const { className, ...rest } = props;
  return <div className={clsx(baseClassName, className)} {...rest} />;
};

const baseClassName = css`
  display: flex;
  flex-direction: column;
`;

export default Column;
