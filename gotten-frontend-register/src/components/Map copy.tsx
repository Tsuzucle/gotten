import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};

const divStyle = {
  background: "white",
  fontSize: 7.5,
};

const MyComponent = () => {
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size,
  };
  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };
  return (
    <LoadScript googleMapsApiKey="API_KEY" onLoad={() => createOffsetSize()}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={positionAkiba} />
        <Marker position={positionIwamotocho} />
        <InfoWindow position={positionAkiba} options={infoWindowOptions}>
          <div style={divStyle}>
            <h1>秋葉原オフィス</h1>
          </div>
        </InfoWindow>
        <InfoWindow position={positionIwamotocho} options={infoWindowOptions}>
          <div style={divStyle}>
            <h1>岩本町オフィス</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;
