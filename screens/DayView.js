import { View, Text, Button,Image,useWindowDimensions,StyleSheet } from 'react-native'
import React from 'react'
import Welcome from './Welcome'
import { useRoute } from '@react-navigation/native'

const DayView = () => {
    const wid = useWindowDimensions().width;
    const route = useRoute();
     const src= route.params.pp;
  
  return (
    <View style={styles.container}>
        <Welcome />
        <View style={styles.innerContainer}>
         <Image 
         source={{uri: src.src}}
         style={{ width:wid,alignSelf:'center',height:200}}
         />
        
        

            </View>
   
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    innerContainer:{alignItems:'center',justifyContent:'center',flex:0.9}
})

export default DayView