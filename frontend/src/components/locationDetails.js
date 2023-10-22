import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "../components/Message";

async function reverseGeocode(latitude, longitude) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { reverseGeocode };

function LocationDetails({ latitude, longitude }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAddress() {
      try {
        const result = await reverseGeocode(latitude, longitude);
        setAddress(result.display_name);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address:", error);
        setLoading(false);
      }
    }

    fetchAddress();
  }, [latitude, longitude]);

  return (
    <div>
      {loading ? (
        <p>Loading address...</p>
      ) : (
        <Message variant="success">{address}</Message>
      )}
    </div>
  );
}

export default LocationDetails;
