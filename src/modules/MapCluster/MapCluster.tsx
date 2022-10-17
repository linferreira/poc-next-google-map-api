import React from "react";
import GoogleMapReact from "google-map-react";
import { API_KEY } from "../../constants/enviroments";
import { theme } from "../../constants/mapStyle";
import { stores } from "../../constants/stores";
import { Container } from "./MapCluster.styles";
import { brazilianStates } from "../../constants/brazilianStates";
import Select from "../../components/Select/Select";
import useSupercluster from "use-supercluster";

type SelectValue = {
  value: string;
  label: string;
  position: {
    lat: number;
    lng: number;
  };
};

const Marker = ({ children, lat, lng }) => children;

export default function MapCluster() {
  const mapRef = React.useRef<any>();
  const [bounds, setBounds] = React.useState(null);
  const [position, setPosition] = React.useState({
    lat: -14.235004,
    lng: -51.925282,
  });
  const [stateSelected, setStateSelected] = React.useState(null);
  const [zoom, setZoom] = React.useState(5);
  const points = stores.map((store, index) => ({
    type: "Feature",
    properties: { cluster: false, storeId: index },
    geometry: {
      type: "Point",
      coordinates: [store.position.lng, store.position.lat],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

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
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current && mapRef.current.setZoom(expansionZoom);
                    mapRef.current &&
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    () => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    };
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`crime-${cluster.properties.crimeId}`}
              lat={latitude}
              lng={longitude}
            >
              <img src={"/map.png"} alt="map icon" width={25} />
            </Marker>
          );
        })}
      </GoogleMapReact>
    </Container>
  );
}
