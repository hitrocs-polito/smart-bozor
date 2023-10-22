import React, { useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl,
} from "react-yandex-maps";

function LocationPicker({ onLocationSelected }) {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleMapClick = (e) => {
    const coordinates = e.get("coords");
    setSelectedCoordinates(coordinates);

    // Get location details (e.g., address) using Yandex Geocoding API.
    // You will need to implement this part separately.

    // Pass the selected location to the parent component
    onLocationSelected(coordinates);
  };

  return (
    <YMaps>
      <div>
        <Map
          width="100%"
          height="400px"
          onClick={handleMapClick}
          defaultState={{ center: [41.2995, 69.2401], zoom: 12, controls: [] }}
          options={{ lang: "uz" }}
        >
          {selectedCoordinates && <Placemark geometry={selectedCoordinates} />}
          <GeolocationControl
            options={{
              float: "right",
            }}
          />
          <ZoomControl
            options={{
              position: { bottom: 50, right: 20 },
              size: "small",
            }}
          />
        </Map>
      </div>
    </YMaps>
  );
}

export default LocationPicker;
