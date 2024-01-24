import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../apis/axiosConfig';
import { getAuthorizationHeader } from '../../apis/tokenManager';

const { width, height } = Dimensions.get('window');
const BORDER_WIDTH = 4;
const FRAME_WIDTH = width * 0.8;

export function QRCodeScannerPage({ navigation }) {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanningEnabled, setScanningEnabled] = useState(true);
  const [forceRender, setForceRender] = useState(false);
  const cameraRef = useRef(null);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  useEffect(() => {
    const cleanup = () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    };

    return cleanup;
  }, []);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    if (scanningEnabled) {
      console.log('Scanned QR Code:', data);
      setScanningEnabled(false);
      sendScannedDataToBackend(data);
    }
  };

  const sendScannedDataToBackend = async (data) => {
    try {
      const token = await getAuthorizationHeader();
      const response = await api.post(`/student/markattendance`, { token: data }, token);
      console.log(response.data);
      Alert.alert(response.data.message, "Make sure to scan the QR code on leaving the place until you scan; it will be absent.");
    } catch (error) {
      console.error('Error sending scanned data to backend:', error);
    }
  };

  const toggleFlash = () => {
    setIsFlashOn((prev) => !prev);
  };

  const handleScanAgain = () => {
    setScanningEnabled(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!hasCameraPermission) {
        getCameraPermission();
      } else {
        setScanningEnabled(true);
        if (cameraRef.current) {
          cameraRef.current.resumePreview();
        }
      }

      setForceRender((prev) => !prev);
    }, [hasCameraPermission])
  );

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={isFlashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
        onBarCodeScanned={handleBarCodeScanned}
        key={forceRender ? 'forcedRender' : 'normalRender'}
      >
        <View style={styles.frame} />
        <View style={styles.overlay}>
          <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
            <MaterialIcons
              name={isFlashOn ? 'flashlight-on' : 'flashlight-off'}
              size={24}
              color={isFlashOn ? '#fff' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      </Camera>
      {!scanningEnabled && (
        <TouchableOpacity onPress={handleScanAgain} style={styles.scanAgainButton}>
          <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  frame: {
    position: 'absolute',
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
    width: FRAME_WIDTH,
    height: FRAME_WIDTH,
    top: (height - FRAME_WIDTH) / 2,
    left: (width - FRAME_WIDTH) / 2,
    borderRadius: 16,
  },
  overlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'flex-end',
  },
  flashButton: {
    backgroundColor: '#fe5f01',
    padding: 16,
    borderRadius: 50,
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#fe5f01',
    padding: 16,
    borderRadius: 50,
  },
  scanAgainText: {
    color: '#fff',
    fontSize: 16,
  },
});
