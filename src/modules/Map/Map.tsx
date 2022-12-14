import React from "react";
import GoogleMapReact from "google-map-react";
import { API_KEY } from "../../constants/enviroments";
import { theme } from "../../constants/mapStyle";
import { stores } from "../../constants/stores";
import { Container } from "./Map.styles";
import { brazilianStates } from "../../constants/brazilianStates";
import Select from "../../components/Select/Select";

type Props = {
  text: string;
  lat: number;
  lng: number;
};

type SelectValue = {
  value: string;
  label: string;
  position: {
    lat: number;
    lng: number;
  };
};

const Pin = (props: Props) => <img src={"/map.png"} alt="map" width={25} />;

export default function Map() {
  const mapRef = React.useRef();
  const [bounds, setBounds] = React.useState(null);
  const [position, setPosition] = React.useState({
    lat: -14.235004,
    lng: -51.925282,
  });
  const [stateSelected, setStateSelected] = React.useState(null);
  const [zoom, setZoom] = React.useState(5);

  function handleChangeSelect(newValue: SelectValue) {
    setStateSelected(newValue);
    setPosition(newValue.position);
    setZoom(11);
  }

  function handleMapChange({ bounds, center, zoom }) {
    const { lat, lng } = center;
    setZoom(zoom);
    setPosition({ lat, lng });
    setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat]);
  }

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
    <Container>
      <Select
        className="select"
        name={"states select"}
        onChange={handleChangeSelect}
        value={stateSelected}
        placeholder="Selecionar estado"
        noOptionsMessage={() => "Estado não encontrado."}
        options={brazilianStates || []}
        menuPortalTarget={
          typeof window !== "undefined" ? window.document.body : null
        }
        menuPosition="fixed"
      />
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY, libraries: ["places"] }}
        center={position}
        defaultZoom={zoom}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
        options={{ styles: theme }}
        onChange={handleMapChange}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        {stores.map((store, index) => (
          <Pin
            key={index}
            lat={store.position.lat}
            lng={store.position.lng}
            text={store.name}
          />
        ))}
      </GoogleMapReact>
    </Container>
  );
}
