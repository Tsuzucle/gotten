import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as GIO from "giojs";

const initCountry = "JP";

const data = [
  {
    e: "JP",
    i: "CN",
    v: 3000000,
  },
];

const Earth = () => {
  const ref = useRef(null);

  useEffect(() => {
    const controller = new GIO.Controller(ref.current, {
      control: { initCountry },
    });
    controller.addData(data);
    controller.init();
  }, []);

  return <div style={{ width: "96vw", height: "96vw" }} ref={ref} />;
};

export default Earth;
