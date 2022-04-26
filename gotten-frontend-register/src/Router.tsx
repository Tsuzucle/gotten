import React from "react";
import {
  Route,
  ReactLocation,
  Router as BaseRouter,
} from "@tanstack/react-location";
import { MyPage, Root, Treasures, TreasuresNew } from "./pages";

export const location = new ReactLocation();

const routes: Route[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/treasures/new",
        element: <TreasuresNew />,
      },
      {
        path: "/treasures",
        element: <Treasures />,
      },
    ],
  },
];

const Router: React.FC = () => {
  return <BaseRouter routes={routes} location={location} />;
};

export default Router;
