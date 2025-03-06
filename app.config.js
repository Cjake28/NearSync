import "dotenv/config"; // Load environment variables

console.log(process.env.GOOGLE_MAPS_API_KEY)
export default {
  expo: {
    name: "vendor-map-app",
    slug: "vendor-map-app",
    scheme: "vendor-map-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      },
      supportsTablet: true
    },
    android: {
      package: "com.Netsu28.vendorapp",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: ["expo-router"],
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "364dddfa-249e-4ec6-a4ec-4a22090ed7c0"
      }
    }
  }
};
