// src/utils/geocode.js

import axios from "axios";

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
