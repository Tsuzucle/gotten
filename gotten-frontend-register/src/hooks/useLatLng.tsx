import { useEffect, useState } from "react";

const useLatLng = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(
    null
  );
  console.log(location);
  useEffect(() => {
    const Geolocation = navigator.geolocation;
    Geolocation.getCurrentPosition((position) => {
      console.log("Hello");
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return location;
};

export default useLatLng;
