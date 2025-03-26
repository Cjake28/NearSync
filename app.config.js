import "dotenv/config";

export default {
  expo: {
    name: "NearSync",
    slug: "NearSync",
    scheme: "NearSync",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: "${GOOGLE_MAPS_API_KEY}", // ✅ Fixed
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: "${GOOGLE_MAPS_API_KEY}", // ✅ Fixed
        },
      },
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: [
      "expo-router",
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow NearSync to use your location."
        }
      ]
    ],
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY, // ✅ Ensures correct resolution
    },
  },
};
