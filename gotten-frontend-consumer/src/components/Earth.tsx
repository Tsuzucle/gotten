import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as GIO from "giojs";

const initCountry = "JP";

const Earth = () => {
  const ref = useRef(null);

  useEffect(() => {
    const controller = new GIO.Controller(ref.current, {
      control: { initCountry },
    });
    controller.init();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
      }}
      ref={ref}
    />
  );
};

export default Earth;
