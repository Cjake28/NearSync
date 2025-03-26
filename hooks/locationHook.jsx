import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let subscription;

    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // Subscribe to location updates
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 50, distanceInterval: 1 },
        (newLocation) => setLocation(newLocation.coords)
      );
    };

    requestLocation();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return { location, errorMsg };
}
