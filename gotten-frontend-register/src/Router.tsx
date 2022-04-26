import React from "react";
import {
  Route,
  ReactLocation,
  Router as BaseRouter,
} from "@tanstack/react-location";
import { Root } from "./pages";

export const location = new ReactLocation();

const routes: Route[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/mypage",
        element: <div>mypage</div>,
      },
      {
        path: "/lotteries",
        element: <div>mypage</div>,
      },
    ],
  },
];

const Router: React.FC = () => {
  return <BaseRouter routes={routes} location={location} />;
};

export default Router;
