import React, { useCallback, useEffect, useRef, useState } from "react";
import { createCustomEqual } from "fast-equals";
import { Wrapper } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

type Props = {
  defaultLatLng: google.maps.LatLngLiteral;
  onChange: (latLng: google.maps.LatLngLiteral) => void;
};

const App: React.FC<Props> = (props) => {
  const { defaultLatLng, onChange } = props;
  const [marker, setMarker] =
    useState<google.maps.LatLngLiteral>(defaultLatLng);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] =
    useState<google.maps.LatLngLiteral>(defaultLatLng);

  const onClick = (e: google.maps.MapMouseEvent) => {
    const newLatLng = {
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    };
    onChange(newLatLng);
    setMarker(newLatLng);
  };

  const onIdle = useCallback((m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  }, []);

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "250px",
        width: "100px",
        overflow: "auto",
      }}
    >
      <pre>
        {marker.lat > 0 ? "北緯" : "南緯"} : {marker.lat} 度
      </pre>
      <pre>
        {marker.lng > 0 ? "東経" : "西経"} : {marker.lng} 度
      </pre>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "400px" }}>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          <Marker position={marker} />
        </Map>
      </Wrapper>
      {form}
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default App;
