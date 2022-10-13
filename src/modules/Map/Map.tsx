import React from "react";
import GoogleMapReact from "google-map-react";
import { API_KEY } from "../../constants/enviroments";
import { theme } from "../../constants/mapStyle";

type Props = {
  text: string;
  lat: number;
  lng: number;
};

const AnyReactComponent = ({ text }: Props) => (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: 30,
      background: "red",
      color: "white",
    }}
  />
);

export default function Map() {
  const [position, setPosition] = React.useState({
    lat: -14.235004,
    lng: -51.925282,
  });
  const [zoom, setZoom] = React.useState(5);

  React.useEffect(() => {
    if (typeof navigator !== "undefined") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(11);
        });
      }
    }
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY, libraries: ["places"] }}
        center={position}
        defaultZoom={zoom}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
        options={{ styles: theme }}
      >
        <AnyReactComponent
          lat={-23.4660121}
          lng={-47.4951893}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
