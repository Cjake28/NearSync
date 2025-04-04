import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// ✅ Store everything after login
export const storeAuthData = ({ accessToken, refreshToken, mqttEmail, mqttPass, user }) => {
  storage.set('accessToken', accessToken);
  storage.set('refreshToken', refreshToken);
  storage.set('mqttEmail', mqttEmail);
  storage.set('mqttPass', mqttPass);
  storage.set('email', user.email);
  storage.set('userID', user.userID.toString()); // store as string
};

// ✅ Get all auth-related data
export const getAuthData = () => {
  return {
    accessToken: storage.getString('accessToken'),
    refreshToken: storage.getString('refreshToken'),
    mqttEmail: storage.getString('mqttEmail'),
    mqttPass: storage.getString('mqttPass'),
    user: {
      email: storage.getString('email'),
      userID: parseInt(storage.getString('userID')),
    },
  };
};

// ✅ Remove all auth-related data
export const clearAuthData = () => {
  storage.delete('accessToken');
  storage.delete('refreshToken');
  storage.delete('mqttEmail');
  storage.delete('mqttPass');
  storage.delete('email');
  storage.delete('userID');
};
