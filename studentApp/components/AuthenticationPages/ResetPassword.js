import React, { useState } from 'react';
import { View, Dimensions, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { commonStyles } from './styles.js';
import theme from '../../themes.js';
import { api } from '../../apis/axiosConfig.js';

export const ResetPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const styles = commonStyles(theme);

   const handleResetPassword = async () => {
    try {
      if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
        Alert.alert("Invalid Passwords", "New password and confirm password must match");
        return;
      }

      await api.post('/student/resetpassword', { newPassword });

      navigation.navigate('Login');

      Alert.alert("Password Reset Successful", "You can now login with your new password.");
    } catch (err) {
      console.error('Error during password reset:', err);
      setError("Password reset failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <Text style={[styles.heading, { color: '#fe5f01' }]}>Reset Password</Text>

            <TextInput
              style={styles.input}
              label="New Password"
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}
              secureTextEntry={!showPassword}
              theme={{ colors: { primary: theme.colors.primary } }}
              right={
                <TextInput.Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  color={theme.colors.primary}
                  onPress={togglePasswordVisibility}
                />
              }
              
            />

            <TextInput
              style={styles.input}
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              secureTextEntry={!showPassword}
              theme={{ colors: { primary: theme.colors.primary } }}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Button mode="contained" onPress={handleResetPassword} style={styles.button}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

