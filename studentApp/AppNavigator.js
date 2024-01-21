import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './components/AuthenticationPages/LoginPage';
import { ResetPassword } from './components/AuthenticationPages/ResetPassword';
import { QRCodeScannerPage } from './components/QRCodePage/QRCode';
import { Attendance } from './components/AttendancePage/Attendance';
import { Profile } from './components/Profile/Profile';
import { getToken } from './apis/tokenManager';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = ({ isAuthenticated }) => (
  <Stack.Navigator initialRouteName="Login" name="AuthStack">
    <Stack.Screen name="Login" options={{ headerShown: false }} >
      {(props) => <LoginScreen {...props} isAuthenticated={isAuthenticated} />}
    </Stack.Screen>
    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const MainTabs = ({ isAuthenticated }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Profile') {
          iconName = 'account';
        } else if (route.name === 'QRCode') {
          iconName = 'qrcode-scan';
        } else if (route.name === 'Dashboard') {
          iconName = 'format-list-bulleted';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={Attendance} options={{ headerShown: true, headerTitle: 'Dashboard' }} />
    <Tab.Screen name="QRCode" component={QRCodeScannerPage} options={{ headerShown: false }} />
    <Tab.Screen
      name="Profile"
      component={() => <Profile isAuthenticated={isAuthenticated} />}
      options={{ headerShown: true, title: 'Profile' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getToken()
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="MainTabs"
            component={() => <MainTabs isAuthenticated={setIsAuthenticated} />}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack isAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
