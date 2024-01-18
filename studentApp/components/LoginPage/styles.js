
import { StyleSheet } from 'react-native';

export const commonStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.accent,
      textAlign:'center'
    },
    card: {
      alignItems: 'center', 
      justifyContent: 'center',
      width: '80%',
      padding: 0,
      borderRadius: 12,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      minHeight:350,
    },
    input: {
        width:'100%',
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      minWidth:200
     

    },
    errorText: {
      color: theme.colors.error,
      marginBottom: 20,
    },
    button: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
    },
    buttonText: {
      color: theme.colors.accent,
      fontSize: 16,
      fontWeight: 'bold',
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%'


    },
  });
