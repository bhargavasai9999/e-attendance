
import React, { useState } from 'react';
import { View, Dimensions, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from './styles';
import { orangeWhiteTheme } from '../../theme.js';
import { api } from '../../apis/axiosConfig.js';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const theme = orangeWhiteTheme;
  const styles = commonStyles(theme);

  const handleLogin = async () => {
    try {
      console.log(username,password)
      const response = await api.post('/login', { rollNumber: username, password: password })
        .then((res) => {
          console.log(res);
          AsyncStorage.setItem('jwtToken', res.data.token);
          Alert.alert("Login successful");
        })
        .catch((err) => {
          console.error('Error during login:', err);
          Alert.alert("Login failed", err.message);
        });
    } catch (err) {
      console.error('Error during login:', err);
      Alert.alert("Login failed", err.message);
    }
  };

  const handleInputChange = (inputField, value) => {
    if (inputField === 'username') {
      setUsername(value);
    } else if (inputField === 'password') {
      setPassword(value);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.8;

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>E-attendance Student-App</Text>

        <Card style={[styles.card, { width: cardWidth }]} elevation={5}>
          <Card.Content>
            <Text style={[styles.heading, { color: '#fe5f01' }]}>Student Login</Text>

            <TextInput
              style={styles.input}
              label="Roll Number"
              value={username}
              onChangeText={(value) => handleInputChange('username', value)}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
              style={styles.input}
              label="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(value) => handleInputChange('password', value)}
              theme={{ colors: { primary: theme.colors.primary } }}
              right={
                <TextInput.Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  color={theme.colors.primary}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

export default Login;
