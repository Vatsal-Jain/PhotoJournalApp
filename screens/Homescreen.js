import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Welcome from './Welcome';
import React from 'react'
import GalleryScreen from './GalleryScreen';
import BottomNav from '../components/BottomTabNav';

const Homescreen = () => {
  return (
    <View style={styles.container}>
     <StatusBar barStyle={'dark-content'} backgroundColor={'white'} /> 
    <Welcome />
 

   <GalleryScreen />
<BottomNav />
    
 
   
 </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor:'white'
  },
});


export default Homescreen