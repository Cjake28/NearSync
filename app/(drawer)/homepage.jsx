import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocation } from "../../hooks/locationHook"; // Ensure the file name matches

const HomePage = () => {
  const { location, errorMsg } = useLocation();

  return (
    <View style={{ flex: 1 }}>
      {errorMsg ? (
        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>{errorMsg}</Text>
      ) : (
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : {
                  latitude: 14.9037221, // Default coordinates
                  longitude: 120.7889415,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
          }
          showsUserLocation
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
            />
          )}
        </MapView>
      )}
    </View>
  );
};

export default HomePage;
