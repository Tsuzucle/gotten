import { useEffect, useState } from "react";
import { Map } from "../components";
import { loadTreasures } from "../contract";
import { Treasure } from "../types";

const fields = {
  name: "",
};

const Find = () => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  useEffect(() => {
    loadTreasures().then((treasures) => {
      setTreasures(treasures);
    });
  }, []);

  return <Map treasures={treasures} />;
};

export default Find;
