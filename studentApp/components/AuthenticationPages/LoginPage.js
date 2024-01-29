import React, { useEffect, useState } from 'react';
import { View, Dimensions, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { commonStyles } from './styles.js';
import theme from '../../themes.js'
import { api } from '../../apis/axiosConfig.js';
import { setToken } from '../../apis/tokenManager.js';

const Login = ({ navigation, isAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPasswordUsername, setResetPasswordUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = commonStyles(theme);

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!username || !password) {
        Alert.alert("Incomplete Details", "Please fill valid Roll Number and password");
        return;
      }

      await api.post('/student/login', { rollNumber: username?.toUpperCase(), password: password })
        .then((res) => {
          console.log(res.data.message);
          setToken(res.data.token);
          Alert.alert("Login successful", res.data.message);
          isAuthenticated(true);
          navigation.replace('MainTabs');
        })
        .catch((err) => {
          console.error('Error during login:', err);
          Alert.alert("Login failed", err.response?.data?.message);
        });
    } catch (err) {
      console.error('Error during login:', err);
      Alert.alert("Login failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      if (!resetPasswordUsername) {
        Alert.alert("Invalid Roll Number", "Please enter your Roll Number for password reset.");
        return;
      }

      await api.post('/student/resetpassword', { rollNumber: resetPasswordUsername?.toUpperCase() })
        .then((res) => {
          console.log(res.data);
          Alert.alert("Verification link", res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });

    } catch (err) {
      console.error('Error during password reset:', err);
      setError("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
    setResetPasswordUsername('');
    setError('');
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.8;

  useEffect(() => {
    const checkServer = async () => {
      await api.get('/').then((res) => {

      }).catch((err) => {
        Alert.alert("Check Internet Connection", "Unable connect server");
      });
    };
    checkServer();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>E-attendance Student-App</Text>

        <Card style={[styles.card, { width: cardWidth }]} elevation={5}>
          <Card.Content>
            {forgotPassword ? (
              <>
                <Text style={[styles.heading, { color: '#fe5f01' }]}>Forgot Password</Text>
                <TextInput
                  style={styles.input}
                  label="Enter Roll Number"
                  value={resetPasswordUsername}
                  onChangeText={(value) => setResetPasswordUsername(value)}
                  theme={{ colors: { primary: theme.colors.primary } }}
                />
                <Text onPress={toggleForgotPassword} style={styles.forgotPasswordText}>
                  Login here
                </Text>
                <Button
                  mode="contained"
                  onPress={handleResetPassword}
                  style={styles.button}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={theme.colors.white} />
                  ) : (
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Text style={[styles.heading, { color: '#fe5f01' }]}>Student Login</Text>
                <TextInput
                  style={styles.input}
                  label="Roll Number"
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                  theme={{ colors: { primary: theme.colors.primary } }}
                />
                <TextInput
                  style={styles.input}
                  label="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  theme={{ colors: { primary: theme.colors.primary } }}
                  right={
                    <>
                      <TextInput.Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        color={theme.colors.primary}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    </>
                  }
                />
                <Text onPress={toggleForgotPassword} style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Button
                  mode="contained"
                  onPress={handleLogin}
                  style={styles.button}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={theme.colors.accent} />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </Button>
              </>
            )}
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

export default Login;
