import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground ,Dimensions} from 'react-native';
import { Card,Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../AuthenticationPages/styles';
import theme from '../../themes';
import { api } from '../../apis/axiosConfig';
import { getAuthorizationHeader } from '../../apis/tokenManager';

export const Profile = ({ navigation,isAuthenticated }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    attendancePercentage: '', 
  });
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.8;
  const handleLogout = async () => {
    const res=await AsyncStorage.removeItem('jwtToken');
    isAuthenticated(false)
    navigation.replace('AuthStack'); 
  };

  
  useEffect(() => {
    const fetchData=async()=>{
      const token =await getAuthorizationHeader()
      await api.get('/student/profile',token).then((res)=>{
        console.log(res.data)
        setUserDetails({
          name: res.data.profile.name || "",
          email: res.data.profile.email||"",
          mobile: res.data.profile.mobile_number|| "",
          attendancePercentage:res.data.percentage+"%"|| "", 
        })

      }).catch((err)=>{
        console.log(err)
      })
    }
    fetchData()

  }, []);

  const styles = commonStyles(theme); 

  return (
    <ImageBackground 
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
      <Card style={[styles.card, { width: cardWidth }]} elevation={5}>
        <Card.Content>

        <Text style={[styles.heading, { color: '#fe5f01' },{textDecorationLine:'underline'}]}>Profile</Text>
        <Text style={[styles.heading, { color: '#000000' },{fontSize:18}]}>Name:<Text style={{color:'red'}}> {userDetails.name}</Text></Text>
        <Text style={[styles.heading, { color: '#000000' },{fontSize:18}]}>Email: <Text style={{color:'red'}}> {userDetails.email}</Text></Text>
        <Text style={[styles.heading, { color: '#000000' },{fontSize:18}]}>Mobile: <Text style={{color:'red'}}> {userDetails.mobile}</Text></Text>
        <Text style={[styles.heading, { color: '#000000' },{fontSize:18}]}>Attendance Percentage: <Text style={{color:'green'}}> {userDetails.attendancePercentage}</Text></Text>
        <Button title="Logout" onPress={handleLogout} style={[styles.button,{width:100},{justifyContent:'center'}]} >
            <Text style={[{color:'#fff'}]}>Logout</Text>
            </Button>
            </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

