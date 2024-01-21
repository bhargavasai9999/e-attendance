import AsyncStorage from '@react-native-async-storage/async-storage';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const setToken = async (token) => {
  try {
    const expirationDate = new Date().getTime() + ONE_DAY_IN_MILLISECONDS;

    await AsyncStorage.setItem('jwtToken', token);
    await AsyncStorage.setItem('tokenExpiration', expirationDate.toString());
  } catch (error) {
    console.error('Error setting token:', error);
    throw error;
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    const expirationDate = await AsyncStorage.getItem('tokenExpiration');

    if (token && expirationDate) {
      const currentTimestamp = new Date().getTime();
      if (currentTimestamp < parseInt(expirationDate, 10)) {
        return token;
      } else {
        await removeToken();
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.removeItem('tokenExpiration');
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};

const getAuthorizationHeader = async () => {
  const token = await getToken();
  if (token) {
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  }
  return null;
};

export { setToken, getToken, removeToken, getAuthorizationHeader };
